'use strict'

const Twitter = require('twitter');
const client = new Twitter(require('./config'));
const tenki = require('./scripts/tenki');
const tw_post = require('./libs/twitter_post');

// let params = {screen_name: 'OKenzo22'};
// client.get('statuses/user_timeline', params, (error, tweets, response) => {
//   if (!error) {
//     console.log(tweets);
//   }
// });


// let tweet = 'botから投稿しています #gsacademy';
// client.post('statuses/update', {status : tweet}, (error, tweet, response) => {
//     if (error) {
//         process.stderr.write(error + '\n');
//         return;
//     }
// });

client.stream('statuses/filter', {'track':'@gs_kodama'}, (stream) => {
  stream.on('data', (data) => {
    let words = data.text.split(' ');
    console.log(words);

    if(!words[1]){
      console.log('コマンドなし');
      return; //エラーコマンドなし
    }

    let command = words[1];
    if(command === 'ping'){
		tw_post(data.user.screen_name,'pong',client);
    }else if(command === 'tenki'){
    	tenki((tweet) => {
    		tw_post(data.user.screen_name,tweet,client); // /libs/twitter_post.js を呼び出す
    	});
    }
  });
});




