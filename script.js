// Global variables
let lifetimeChart = null;
const LIFESPAN_YEARS = 80;
const SLEEP_HOURS_PER_DAY = 8;
const HOURS_PER_DAY = 24;

// DOM elements
const form = document.getElementById('screenTimeForm');
const resultsSection = document.getElementById('resultsSection');
const screenTimeInput = document.getElementById('screenTime');
const screenTimeValueElement = document.getElementById('screenTimeValue');
const screenTimeYearsElement = document.getElementById('screenTimeYears');
const sleepTimeYearsElement = document.getElementById('sleepTimeYears');
const otherTimeYearsElement = document.getElementById('otherTimeYears');
const insightsElement = document.getElementById('insights');
const headerScreenTimeElement = document.getElementById('headerScreenTime');
const headerLifetimeYearsElement = document.getElementById('headerLifetimeYears');

// Event listeners
form.addEventListener('submit', handleFormSubmit);
screenTimeInput.addEventListener('input', handleSliderInput);

// Initialize the page
document.addEventListener('DOMContentLoaded', function() {
    // Set default values
    updateStats(0, calculateSleepYears(), calculateOtherYears(0));
});

function handleSliderInput() {
    const sliderValue = parseInt(screenTimeInput.value);
    const hours = sliderValue / 2; // Convert slider value (0-48) to hours (0-24)
    
    // Update the displayed value
    screenTimeValueElement.textContent = hours.toFixed(1);
    
    // Update header stats
    headerScreenTimeElement.textContent = hours.toFixed(1) + 'h';
    
    // Update stats in real-time
    if (!isNaN(hours) && hours >= 0 && hours <= 24) {
        const screenTimeYears = calculateScreenTimeYears(hours);
        const sleepTimeYears = calculateSleepYears();
        const otherTimeYears = calculateOtherYears(hours);
        
        // Update stats in real-time
        updateStats(screenTimeYears, sleepTimeYears, otherTimeYears);
        
        // Update header lifetime years
        headerLifetimeYearsElement.textContent = screenTimeYears.toFixed(1);
    }
}

function handleFormSubmit(e) {
    e.preventDefault();
    
    const sliderValue = parseInt(screenTimeInput.value);
    const dailyScreenTime = sliderValue / 2; // Convert slider value (0-48) to hours (0-24)
    
    if (isNaN(dailyScreenTime) || dailyScreenTime < 0 || dailyScreenTime > 24) {
        alert('Please select a valid screen time between 0 and 24 hours');
        return;
    }
    
    // Calculate years
    const screenTimeYears = calculateScreenTimeYears(dailyScreenTime);
    const sleepTimeYears = calculateSleepYears();
    const otherTimeYears = calculateOtherYears(dailyScreenTime);
    
    // Update UI
    updateStats(screenTimeYears, sleepTimeYears, otherTimeYears);
    updateChart(screenTimeYears, sleepTimeYears, otherTimeYears);
    updateInsights(dailyScreenTime, screenTimeYears);
    
    // Show results
    resultsSection.style.display = 'block';
    resultsSection.scrollIntoView({ behavior: 'smooth' });
}

function calculateScreenTimeYears(dailyHours) {
    const totalScreenHours = dailyHours * 365 * LIFESPAN_YEARS;
    return totalScreenHours / (365 * HOURS_PER_DAY);
}

function calculateSleepYears() {
    const totalSleepHours = SLEEP_HOURS_PER_DAY * 365 * LIFESPAN_YEARS;
    return totalSleepHours / (365 * HOURS_PER_DAY);
}

function calculateOtherYears(dailyScreenHours) {
    const screenTimeYears = calculateScreenTimeYears(dailyScreenHours);
    const sleepTimeYears = calculateSleepYears();
    return LIFESPAN_YEARS - screenTimeYears - sleepTimeYears;
}

function updateStats(screenTimeYears, sleepTimeYears, otherTimeYears) {
    screenTimeYearsElement.textContent = screenTimeYears.toFixed(1);
    sleepTimeYearsElement.textContent = sleepTimeYears.toFixed(1);
    otherTimeYearsElement.textContent = otherTimeYears.toFixed(1);
}

function updateChart(screenTimeYears, sleepTimeYears, otherTimeYears) {
    const ctx = document.getElementById('lifetimeChart').getContext('2d');
    
    // Destroy existing chart if it exists
    if (lifetimeChart) {
        lifetimeChart.destroy();
    }
    
    lifetimeChart = new Chart(ctx, {
        type: 'doughnut',
        data: {
            labels: ['Screen Time', 'Sleep Time', 'Other Activities'],
            datasets: [{
                data: [screenTimeYears, sleepTimeYears, otherTimeYears],
                backgroundColor: [
                    '#FF6B6B',
                    '#4ECDC4',
                    '#45B7D1'
                ],
                borderColor: [
                    '#FF5252',
                    '#26A69A',
                    '#1976D2'
                ],
                borderWidth: 2,
                hoverOffset: 4
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    display: false
                },
                tooltip: {
                    callbacks: {
                        label: function(context) {
                            const label = context.label || '';
                            const value = context.parsed;
                            const percentage = ((value / LIFESPAN_YEARS) * 100).toFixed(1);
                            return `${label}: ${value.toFixed(1)} years (${percentage}%)`;
                        }
                    }
                }
            },
            animation: {
                animateRotate: true,
                animateScale: true
            }
        }
    });
}

function updateInsights(dailyScreenTime, screenTimeYears) {
    const percentage = ((screenTimeYears / LIFESPAN_YEARS) * 100).toFixed(1);
    const sleepPercentage = ((calculateSleepYears() / LIFESPAN_YEARS) * 100).toFixed(1);
    const otherPercentage = ((calculateOtherYears(dailyScreenTime) / LIFESPAN_YEARS) * 100).toFixed(1);
    
    let insightsHTML = '';
    
    // Screen time insights
    if (dailyScreenTime <= 2) {
        insightsHTML += `
            <div class="insight-item">
                <strong>🎉 Great job!</strong> With only ${dailyScreenTime} hours of daily screen time, 
                you're spending just ${percentage}% of your life looking at screens. 
                You're well below the average and maintaining a healthy digital balance.
            </div>
        `;
    } else if (dailyScreenTime <= 4) {
        insightsHTML += `
            <div class="insight-item">
                <strong>👍 Good balance!</strong> Your ${dailyScreenTime} hours of daily screen time 
                means you'll spend ${percentage}% of your life on screens. 
                This is a reasonable amount for modern life.
            </div>
        `;
    } else if (dailyScreenTime <= 6) {
        insightsHTML += `
            <div class="insight-item">
                <strong>⚠️ Moderate usage.</strong> With ${dailyScreenTime} hours daily, 
                you'll spend ${percentage}% of your life on screens. 
                Consider taking more breaks and outdoor activities.
            </div>
        `;
    } else if (dailyScreenTime <= 8) {
        insightsHTML += `
            <div class="insight-item">
                <strong>🚨 High usage alert!</strong> Your ${dailyScreenTime} hours daily 
                means ${percentage}% of your life will be screen time. 
                That's more than a quarter of your life! Consider digital detox strategies.
            </div>
        `;
    } else {
        insightsHTML += `
            <div class="insight-item">
                <strong>🚨 Critical usage!</strong> With ${dailyScreenTime} hours daily, 
                you'll spend ${percentage}% of your life on screens. 
                This could significantly impact your health and relationships. 
                Consider professional help for digital wellness.
            </div>
        `;
    }
    
    // Sleep comparison
    insightsHTML += `
        <div class="insight-item">
            <strong>😴 Sleep comparison:</strong> You'll spend ${sleepPercentage}% of your life sleeping 
            (${calculateSleepYears().toFixed(1)} years), which is essential for health. 
            Your screen time (${percentage}%) is ${parseFloat(percentage) > parseFloat(sleepPercentage) ? 'more' : 'less'} than your sleep time.
        </div>
    `;
    
    // Other activities
    insightsHTML += `
        <div class="insight-item">
            <strong>⚡ Other activities:</strong> You'll have ${otherPercentage}% of your life 
            (${calculateOtherYears(dailyScreenTime).toFixed(1)} years) for everything else: 
            work, relationships, hobbies, exercise, and personal growth.
        </div>
    `;
    
    // Time comparison examples
    const screenTimeInDays = screenTimeYears * 365;
    const screenTimeInWeeks = screenTimeInDays / 7;
    const screenTimeInMonths = screenTimeYears * 12;
    
    insightsHTML += `
        <div class="insight-item">
            <strong>📊 Time breakdown:</strong> Your screen time equals approximately 
            ${screenTimeInDays.toFixed(0)} days, ${screenTimeInWeeks.toFixed(0)} weeks, 
            or ${screenTimeInMonths.toFixed(0)} months of continuous screen viewing.
        </div>
    `;
    
    // Recommendations
    if (dailyScreenTime > 4) {
        insightsHTML += `
            <div class="insight-item">
                <strong>💡 Recommendations:</strong>
                <ul style="margin-top: 10px; margin-left: 20px;">
                    <li>Set screen time limits on your devices</li>
                    <li>Take regular breaks every 20-30 minutes</li>
                    <li>Use blue light filters in the evening</li>
                    <li>Replace some screen time with outdoor activities</li>
                    <li>Practice the 20-20-20 rule: every 20 minutes, look at something 20 feet away for 20 seconds</li>
                </ul>
            </div>
        `;
    }
    
    insightsElement.innerHTML = insightsHTML;
}

// Add some interactive features
function addInteractiveFeatures() {
    // Initialize slider value display
    handleSliderInput();
}

// Initialize interactive features
addInteractiveFeatures(); 