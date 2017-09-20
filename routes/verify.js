const express = require('express');
const router = express.Router();

/* GET API. */
router.get('/verify', function(req, res, next) {
    res.render('verify');
});

module.exports = router;
