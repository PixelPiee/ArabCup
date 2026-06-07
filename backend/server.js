const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 5000;
const DB_FILE = path.join(__dirname, 'data.json');
app.listen(PORT, () => {
  console.log(`Rematch API server is running on port ${PORT}`);
});
