
const express = require('express');
const urlRouter = express.Router();
const { urlController } = require('../controllers/urlController');

const {processUrlsController} =require('../controllers/urlController')
urlRouter.post('/analyze', processUrlsController);

module.exports = urlRouter;
