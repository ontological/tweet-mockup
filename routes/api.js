/*
 * File: api.js
 * Description: Routing calls to our API.
 */

const express = require('express');
const router = express.Router();
const twitterController = require('../controllers/TwitterController');

router.get('/verify', (req, res) => {
    let screenname = req.query.screenname;
    let body = req.query.body;
    let date = req.query.date;

    if(!screenname) {
        res.json({ 'error': "No screenname provided." });
        return;
    }

    // twitterController.getTweets(res, screenname);
    twitterController.searchTweets(res, screenname, body, date);

});

module.exports = router;