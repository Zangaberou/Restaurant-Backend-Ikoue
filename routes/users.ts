const express = require('express');
const router = express.Router();
const { addFavorite, getFavorites } = require('../controllers/userController');

router.post('/favorites/:userId/:dishId', addFavorite);
router.get('/favorites/:userId', getFavorites);

module.exports = router;
