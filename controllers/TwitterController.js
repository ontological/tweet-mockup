const Twitter = require('twitter');

// Setup Twitter client
const client = new Twitter(require('../private/Keys').twitterKeys);

module.exports.getTweets = (screenname, res) => {
    // Params for Twitter API.
    let params = {screen_name: screenname, count: 200};

    // Get tweets from Twitter API.
    client.get('statuses/user_timeline', params, function(error, tweets, response) {
        // If Twitter API error.
        if(error) {
            console.log('Twitter error:');
            console.log(error);

            res.json({'error': 'Twitter error'});
            return;
        }

        // Sending only Tweets. Till we get searching done.
        parsed = tweets.map((tweet) => {
            return {date: tweet.created_at, text: tweet.text};
        });

        res.json({'screenname': screenname, 'tweets': parsed});
    });
};