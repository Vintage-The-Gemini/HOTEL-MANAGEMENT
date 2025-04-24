const express = require('express');
const router = express.Router();
const  = require('../controllers/quotationController.js');

// Basic route structure to prevent errors
router.get('/', .getAll);
router.get('/:id', .getById);
router.post('/', .create);
router.put('/:id', .update);
router.delete('/:id', .delete);

module.exports = router;
