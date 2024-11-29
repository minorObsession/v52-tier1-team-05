const Gun = require('gun'); // Import Gun.js

// Initialize Gun instance
const gun = Gun({
  web: require('http').createServer().listen(3000), // Gun.js server listening on port 3000 for local dev
});

// Export the Gun instance as a serverless function for Vercel
module.exports = (req, res) => {
  gun.wsp(req, res); // Handle WebSocket protocol
};
