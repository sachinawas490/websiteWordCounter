
const express = require('express');
const urlRouter = express.Router();
const { urlController } = require('../controllers/urlController');


urlRouter.post('/analyze', urlController);


module.exports = urlRouter;
