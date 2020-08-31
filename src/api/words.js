const express = require('express');
const monk = require('monk');
const Joi = require('@hapi/joi');

const db = monk(process.env.MONGO_URI);
// const db = monk(process.env.MONGO_ADMIN_URI);
const words = db.get('documents');

const schema = Joi.object({
  word: Joi.string().trim().required(),
  points: Joi.number().integer().required(),
});

const router = express.Router();

router.get('/', async (req, res, next) => {
  try {
    const items = await words.find({});

    return res.json(items);
  } catch (e) {
    return next(e);
  }
});

router.get('/:word', async (req, res, next) => {
  try {
    const { word } = req.params;
    const item = await words.findOne({
      word,
    });
    if (!item) return next();

    return res.json(item);
  } catch (e) {
    return next(e);
  }
});

router.post('/', async (req, res, next) => {
  try {
    const value = await schema.validateAsync(req.body);
    const inserted = await words.insert(value);

    return res.json(inserted);
  } catch (e) {
    return next(e);
  }
});

router.put('/:word', async (req, res, next) => {
  try {
    const value = await schema.validateAsync(req.body);
    const item = await words.findOne({
      word,
    });
    if (!item) return next();

    const updated = await words.update({
      word,
    }, {
      $set: value,
    });

    return res.json(updated);
  } catch (e) {
    return next(e);
  }
});

module.exports = router;
