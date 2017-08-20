const Twitter = require('twitter');

// Setup Twitter client
const client = new Twitter(require('../private/Keys').twitterKeys);

module.exports = (app) => {
    app.get('/verify', (req, res) => {
        if(req.query.screenname) {
            let params = {screen_name: req.query.screenname, count: 200};

            client.get('statuses/user_timeline', params, function(error, tweets, response) {
                if (error) {
                    console.log('Twitter Error:');
                    console.log(error);
                    res.send(error);
                    return;
                }

                res.render('verify', {data: req.query, statuses: tweets})
            });
        }
    });
};

module.exports.getVerifiedUsers = () => {

};