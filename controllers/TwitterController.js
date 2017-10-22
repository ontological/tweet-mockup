const Twitter = require('twitter');

const TweetMatcher = require('./TweetMatcher');

// Setup Twitter client
const client = new Twitter(require('../private/Keys').twitterKeys);

const getTweets = (res, screenname, maxId) => {
    // Params for Twitter API.
    let params = {screen_name: screenname, count: 200};
    if(maxId) params.max_id = maxId;

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
        let parsed = tweets.map((tweet) => {
            return {date: tweet.created_at, text: tweet.text, id: tweet.id_str};
        });

        res.json({'screenname': screenname, 'tweets': parsed});
    });
};

const searchTweets = (res, screenname, searchText, date) => {
    let params = {screen_name: screenname, count: 200};

    if(typeof searchText === 'string') {
        searchText = new TweetMatcher(searchText);
    }

    client.get('statuses/user_timeline', params, (error, tweets, response) => {
        if(error) {
            console.error(err);
            res.json({error: 'Twitter error.'});
            return;
        } else if(tweets.length === 0) {
            res.json({status: 'unverified'});
            return;
        }

        for(i = 0; i < tweets.length; i++) {
            if(searchText.match(tweets[i])) {


            }
        }

        // Get next set of Tweets
        searchTweets(screenname, searchText, date, subOneString(tweets.pop().id_str));
    });
};

// Method to subtract 1 from a number string.
const subOneString = (s) => {
    // Check if number.
    if(isNaN(s)) throw 'Not a number';

    // Remove leading 0's and split into char array.
    let cArr = s.replace(/^0+/, '').split('');
    let cur = cArr.length - 1;

    while(cur >= 0) {
        if(cArr[cur] === '0') {
            cArr[cur] = '9';
        } else {
            // Subtract 1 and break once non 0
            cArr[cur] = parseInt(cArr[cur]) - 1;
            break;
        }
        cur--;
    }

    return cArr.join('').replace(/^0+/, '');
};

module.exports = {
    getTweets,
    subOneString,
};
