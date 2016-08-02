var Twitter = require('twitter');

var client = new Twitter(require('./config.js'));

var params = {screen_name: 'OKenzo22', count: 1};
client.get('statuses/user_timeline', params, function(error, tweets, response){
  if (!error) {
    console.log(tweets);
  }
});

