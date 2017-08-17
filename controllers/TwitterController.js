let twitter = require('twitter');
let bodyParser = require('body-parser');

// Setup Twitter client
let client = new twitter({
    consumer_key: 'qDrWd68YbECD76Td1Brg0YJZa',
    consumer_secret: 'z1KNxQ2eGyxTaqF5iq8icPgI0VSDfh6TEJgpGTjiOkNvA7Q29T',
    access_token_key: '17305473-Z6uPaAXZOK78WS78wspuozVpGKKunlyY5vMucz2ym',
    access_token_secret: 'kEtSn8dF6lMK7lQlMNOBmdGsm5yaAftwPhl2kwxY3UMsF'
});

// Setup POST parser
let urlencodedParser = bodyParser.urlencoded({ extended: false });


module.exports = (app) => {
    app.post('/verify', urlencodedParser, (req, res) => {
        console.log(req.body);

        let params = {screen_name: req.body.screenname};

        client.get('statuses/user_timeline', params, function(error, tweets, response) {
            if (error) {
                console.log(error);
                res.send("Error");
            }
            console.log(tweets);
            res.render('verify', {data: req.body, statuses: tweets})
        });
    });
};