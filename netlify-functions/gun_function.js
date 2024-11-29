// netlify-functions/gun.js
const Gun = require('gun'); // Import Gun.js

// Initialize Gun instance with peers (can be your custom peer server or public peers)
export const gun = Gun({
  peers: ['https://solarplanner.netlify.app/.netlify-functions/gun_function'], // HTTP endpoint
});

exports.handler = async (event, context) => {
  // Gun.js WebSocket server logic
  // Netlify will use WebSocket connection to interact with Gun

  return {
    statusCode: 200,
    body: JSON.stringify({
      message: 'Gun.js serverless function activated',
    }),
  };
};
