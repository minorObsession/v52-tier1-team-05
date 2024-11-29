// netlify-functions/gun.js
const Gun = require('gun'); // Import Gun.js

// Initialize Gun instance with peers (can be your custom peer server or public peers)
export const gun = Gun({
  peers: [
    'https://gun-manhattan.herokuapp.com',
    'https://your-second-peer-server.com',
    'https://your-third-peer-server.com',
  ], // Gun's default peer server
  //   peers: ['https://your-netlify-url.netlify.app/.netlify/functions/gun']  // Netlify URL and the function endpoint
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
