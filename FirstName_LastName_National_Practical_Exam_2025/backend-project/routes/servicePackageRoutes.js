
const express = require('express');
const router = express.Router();

const {
    getServices,
    addService,
    deleteService
} = require('../controllers/servicePackageController');

router.get('/', getServices);
router.post('/', addService);
router.delete('/:id', deleteService);

module.exports = router;
