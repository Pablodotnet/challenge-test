const express = require('express');
const path = require('path');
const app = express();

const PORT = process.env.PORT || 8080;
const DIST_DIR = path.join(__dirname, 'dist/apps/challenge-test');

// Serve static files
app.use(express.static(DIST_DIR));

// Fallback to index.html for SPA routes
app.get('*', (req, res) => {
  res.sendFile(path.join(DIST_DIR, 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
