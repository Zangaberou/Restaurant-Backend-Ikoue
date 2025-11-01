const express = require('express');
const router = express.Router();
const { createDish, getAllDishes } = require('../controllers/dishController');

router.post('/', createDish);
router.get('/', getAllDishes);

module.exports = router;
