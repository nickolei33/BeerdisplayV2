# Beer Festival Digital Display Board

A responsive web application designed to showcase craft beers available at beer festivals. This digital menu board automatically adapts to different screen sizes and beer quantities, making it perfect for display on large screens at festival venues.

![Beer Festival Display Board](https://placeholder-image-url.com/beer-festival-display.jpg)

## Features

- **Real-time Beer Updates**: Fetches beer data from an API every 30 seconds to ensure the display always shows currently available beers
- **Responsive Design**: Automatically adjusts layout based on screen size and number of beers
- **Visual Adaptability**: Changes font sizes and spacing based on the number of beers to display
- **Brewery Branding**: Displays brewery logos alongside beer information
- **Error Handling**: Graceful error management with retry button
- **Elegant Styling**: Wood-textured background with pub-style design elements

## How It Works

The application pulls beer data from an API endpoint and organizes it into columns based on screen size and the number of beers available:

- Large displays or 40+ beers: 4 columns
- Medium displays or 24+ beers: 3 columns
- Small displays: 2 columns

For each beer, the display shows:
- Brewery logo
- Beer name
- Brewery name
- Beer type and alcohol percentage
- Pricing for 12.5cl and 25cl servings

## Technical Details

### File Structure

- `index.html`: Main HTML structure
- `styles.css`: Styling with responsive breakpoints
- `script.js`: JavaScript for fetching data and building the display



## Installation & Usage

1. Clone the repository:
   ```
   git clone https://github.com/yourusername/festival-beer-display.git
   ```

2. Open `index.html` in a web browser or deploy the files to a web server.

3. For development, you can modify the `apiURL` in `script.js` if needed:
   ```javascript
   const apiURL = "https://nico-c.info/api/beers";
   ```

## Customization

### Styling

You can customize the appearance by modifying the CSS variables in `styles.css`:

- Background colors and textures
- Font sizes and families
- Border styles and colors
- Animation timings

### Layout

To change the column distribution logic, modify the `getOptimalColumnCount` function in `script.js`:

```javascript
const getOptimalColumnCount = (beerCount) => {
  const screenWidth = window.innerWidth;

  if (screenWidth >= 1400 || beerCount > 40) return 4;
  if (screenWidth >= 992 || beerCount > 24) return 3;
  return 2;
};
```

## Browser Compatibility

Tested and working on:
- Chrome 80+
- Firefox 75+
- Safari 13+
- Edge 80+


## Acknowledgments

- Design inspired by traditional pub menu boards
- Uses free web fonts from Google Fonts
