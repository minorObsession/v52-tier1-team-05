const Gun = require('gun'); // Import Gun.js

// Initialize Gun instance
const gun = Gun({
  peers: [], // Specify your peers here (e.g., another Gun.js server or Vercel's peer)
});

// Export the Gun instance as a serverless function for Vercel
module.exports = (req, res) => {
  gun.wsp(req, res); // Handle WebSocket protocol
};
