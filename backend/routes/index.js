const router = require('express').Router();

router.use('/health', require('./health'));
router.use('/exercises', require('./exercises'));

module.exports = router;
