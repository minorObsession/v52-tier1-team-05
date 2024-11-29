const Gun = require('gun'); // Import Gun.js

// Initialize Gun instance
const gun = Gun({
  peers: ['https://solarplanner.netlify.app/.netlify/functions/gunFunction'],
});

module.exports = { gun };

exports.handler = async (event, context) => {
  if (event.httpMethod === 'GET') {
    return {
      statusCode: 200,
      body: JSON.stringify({
        message: 'Gun.js serverless function activated',
      }),
    };
  }

  return {
    statusCode: 400,
    body: JSON.stringify({ error: 'Unsupported request method' }),
  };
};
