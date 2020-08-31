const express = require('express');

const emojis = require('./emojis');
const words = require('./words');

const router = express.Router();

router.get('/', (req, res) => {
  res.json({
    message: 'API - 👋🌎🌍🌏'
  });
});

router.use('/emojis', emojis);
router.use('/words', words);

module.exports = router;
