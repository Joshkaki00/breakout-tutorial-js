const path = require('path');

module.exports = {
  entry: './src/main.js',  // Main JS file
  output: {
    filename: 'bundle.js',  // Output file name
    path: path.resolve(__dirname, 'dist'),  // Output directory
  },
};