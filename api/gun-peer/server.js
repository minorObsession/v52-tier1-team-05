// const express = require('express');
// const Gun = require('gun');
// const app = express();

// // Initialize Gun.js with WebSocket
// const gun = Gun({
//   web: require('http').createServer(app),
// });

// app.get('/', (req, res) => {
//   res.send('Gun.js server is running!');
// });

// // Setup a static route to serve your frontend files if needed
// app.use(express.static('dist')); // Assuming 'dist' is where your frontend files are

// // Start the server and listen on Heroku's dynamic port
// const port = process.env.PORT || 3000;
// app.listen(port, () => {
//   console.log(`Gun.js server running on port ${port}`);
// });

// module.exports = gun;
