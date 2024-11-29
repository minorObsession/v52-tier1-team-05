const Gun = require('gun');
const express = require('express');

const app = express();
const port = process.env.PORT || 8765;

// Serve Gun.js
app.use(Gun.serve);

// Start Express server
const server = app.listen(port, () => {
  console.log(`Gun relay server running on port ${port}`);
});

// Attach Gun to the server
Gun({ web: server });
