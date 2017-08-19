let twitter = require('twitter');

// Setup Twitter client
let client = new twitter({
    consumer_key: 'qDrWd68YbECD76Td1Brg0YJZa',
    consumer_secret: 'z1KNxQ2eGyxTaqF5iq8icPgI0VSDfh6TEJgpGTjiOkNvA7Q29T',
    access_token_key: '17305473-Z6uPaAXZOK78WS78wspuozVpGKKunlyY5vMucz2ym',
    access_token_secret: 'kEtSn8dF6lMK7lQlMNOBmdGsm5yaAftwPhl2kwxY3UMsF'
});

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