const emoji = require('node-emoji');
const htmlEntities = require('html-entities').AllHtmlEntities;
const urlRegex = require('url-regex')({strict: false});

class TweetMatcher {
    // Parse tweet text
    constructor(str) {
        let input;
        let userMentions, hashtags, links;

        // Decode HTML entities
        input = this.text = htmlEntities.decode(str);

        // Replace line breaks with spaces.
        input = input.replace(/\\n/g, ' ');

        // Get links.
        links = input.match(urlRegex);
        this.links = links ? links : [];

        // Remove links then downcase
        input = input.replace(urlRegex, '').toLowerCase();

        // Get user mentions and hashtags then remove hashtag, make lowercase
        const removeFirstChar = (str) => str.slice(1).toLowerCase();

        userMentions = input.match(/@\w+/g);
        this.userMentions = userMentions ? userMentions.map(removeFirstChar) : [];

        hashtags = input.match(/#\w+/g);
        this.hashtags = hashtags ? hashtags.map(removeFirstChar) : [];

        input = input.replace(/[#|@]\w+/g, '');

        // Count words.
        this.count = TweetMatcher.countWords(input);
    }

    // Count words
    static countWords(str) {
        let puncRegex = /[\u2000-\u206F\u2E00-\u2E7F\\'!"$%&()*+,\-.\/:;<=>?\[\]^`{|}~]/g;
        let arr = emoji.strip(str).replace(puncRegex, '').split(' ');
        let counter = {};

        arr.forEach((word) => {
            if(!counter[word]) counter[word] = 1;
            else counter[word]++;
        });

        delete counter[''];

        return counter;
    }

    // Given 2 arrays, return True if each value is equal (case-sensitive)
    static arrayEquals(arr1, arr2) {
        if(arr1.length !== arr2.length) {
            return false;
        }
        for(let i = arr1.length; i--;) {
            if(arr1[i] !== arr2[i]) {
                return false;
            }
        }

        return true;
    }



    // Method to determine whether a something from Twitter API matches the object.
    match(apiObj) {
        let hashtags = apiObj.entities.hashtags.map((tag) => tag.text.toLowerCase());
        let links = apiObj.entities.urls.map((url) => url.display_url);
        let userMentions = apiObj.entities.user_mentions.map((mention) => mention.screen_name.toLowerCase());

        // console.log("hashtag comparsions:"); // TODO: remove
        // console.log(hashtags);
        // console.log(this.hashtags)

        if(TweetMatcher.arrayEquals(hashtags, this.hashtags)) {
            return true;
        }
        return false;
    }
}

module.exports = TweetMatcher;