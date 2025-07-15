# 📱 Lifetime Screen Time Calculator

An interactive web application that calculates and visualizes how much of your life you'll spend looking at screens based on your daily screen time habits.

## 🌟 Features

### Core Functionality
- **Input Form**: Enter your average daily screen time in hours
- **Lifetime Calculations**: Calculate total years spent on screens over an 80-year lifespan
- **Interactive Chart**: Beautiful doughnut chart showing breakdown of:
  - Screen time years
  - Sleep time years (8 hours/day)
  - Other activities years
- **Real-time Updates**: See calculations update as you type
- **Smart Insights**: Personalized recommendations based on your screen time

### Visual Elements
- **Modern UI**: Clean, responsive design with gradient backgrounds
- **Animated Charts**: Interactive Chart.js visualizations
- **Statistics Cards**: Clear display of calculated years
- **Insights Section**: Personalized feedback and recommendations
- **Mobile Responsive**: Works perfectly on all device sizes

### Calculations
- **Lifespan**: Assumes 80 years of life
- **Sleep Time**: 8 hours per day (26.7 years total)
- **Screen Time**: Based on user input
- **Other Activities**: Remaining time for work, relationships, hobbies, etc.

## 🚀 How to Use

1. **Open the Website**: Open `index.html` in any modern web browser
2. **Enter Your Screen Time**: Input your average daily screen time in hours
3. **Calculate**: Click "Calculate My Lifetime" to see results
4. **Explore Results**: View your lifetime breakdown in the interactive chart
5. **Read Insights**: Get personalized recommendations and insights

## 📊 Example Calculations

| Daily Screen Time | Years on Screens | Percentage of Life |
|------------------|------------------|-------------------|
| 2 hours          | 6.7 years        | 8.3%              |
| 4 hours          | 13.3 years       | 16.7%             |
| 6 hours          | 20.0 years       | 25.0%             |
| 8 hours          | 26.7 years       | 33.3%             |

## 🛠️ Technical Details

### Technologies Used
- **HTML5**: Semantic markup structure
- **CSS3**: Modern styling with gradients, animations, and responsive design
- **JavaScript (ES6+)**: Interactive functionality and calculations
- **Chart.js**: Beautiful, responsive charts
- **No Dependencies**: Pure vanilla web technologies

### Browser Compatibility
- Chrome (recommended)
- Firefox
- Safari
- Edge
- Mobile browsers

### File Structure
```
website_cursor/
├── index.html          # Main HTML file
├── styles.css          # CSS styling
├── script.js           # JavaScript functionality
└── README.md           # This file
```

## 🎯 Key Features Explained

### Input Validation
- Accepts values from 0 to 24 hours
- Real-time validation with helpful error messages
- Supports decimal values (e.g., 6.5 hours)

### Chart Visualization
- Interactive doughnut chart
- Hover tooltips with detailed information
- Smooth animations
- Color-coded sections

### Insights Engine
- **Low Usage** (≤2 hours): Encouragement and praise
- **Moderate Usage** (2-4 hours): Balanced feedback
- **High Usage** (4-6 hours): Cautionary advice
- **Very High Usage** (6-8 hours): Strong recommendations
- **Critical Usage** (>8 hours): Serious health warnings

### Responsive Design
- Mobile-first approach
- Flexible grid layouts
- Adaptive typography
- Touch-friendly interface

## 💡 Use Cases

- **Digital Wellness**: Understand your screen time impact
- **Health Awareness**: Visualize lifestyle choices
- **Educational Tool**: Teach about time management
- **Personal Reflection**: Motivate positive changes
- **Family Discussions**: Discuss healthy tech habits

## 🔧 Customization

### Changing Assumptions
You can modify the constants in `script.js`:
```javascript
const LIFESPAN_YEARS = 80;        // Change lifespan
const SLEEP_HOURS_PER_DAY = 8;    // Change sleep hours
```

### Styling
- Modify colors in `styles.css`
- Adjust animations and transitions
- Customize responsive breakpoints

### Adding Features
- Additional time categories
- Age-based calculations
- Data export functionality
- Social sharing features

## 📱 Mobile Experience

The website is fully optimized for mobile devices:
- Touch-friendly buttons and inputs
- Responsive chart sizing
- Readable typography on small screens
- Optimized layout for portrait orientation

## 🎨 Design Philosophy

- **Clean & Modern**: Minimalist design with focus on content
- **Accessible**: High contrast, readable fonts, clear navigation
- **Engaging**: Interactive elements and smooth animations
- **Informative**: Clear data presentation and helpful insights

## 🚀 Getting Started

1. Download all files to a folder
2. Open `index.html` in your web browser
3. Start exploring your digital footprint!

No server setup required - this is a pure client-side application that runs entirely in your browser.

---

**Made with ❤️ for digital wellness awareness** 