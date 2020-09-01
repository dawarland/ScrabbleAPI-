const express = require('express');

const emojis = require('./emojis');
const words = require('./words');

const router = express.Router();

router.get('/', (req, res) => {
  res.json({
    message: '/words/"word_you_want_to_verify"'
  });
});

router.use('/emojis', emojis);
router.use('/words', words);

module.exports = router;
