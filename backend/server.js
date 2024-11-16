const express = require('express');
const cors = require('cors');

const app = express();

// Middleware
app.use(cors());
app.use(express.json()); 
// router for url's
const urlRouter = require('./routers/urlRouter')
app.use('/', urlRouter);

app.listen(4000, () => {
  console.log('Server is running on port 4000');
});
