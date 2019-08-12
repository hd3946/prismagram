import Twitter from 'twitter';
import axios from 'axios';
import twitterimage from './api/twitterimage/twitterimage';


  /*
  const client = new Twitter({
    consumer_key: process.env.TWITTER_CONSUMER_KEY,
    consumer_secret: process.env.TWITTER_CONSUMER_SECRET,
    access_token_key: process.env.TWITTER_ACCESS_TOKEN_KEY,
    access_token_secret: process.env.TWITTER_ACCESS_TOKEN_SECRET
  });

const params = {screen_name: 'nodejs'};
client.get('statuses/user_timeline', params, function(error, tweets, response) {
    if (!error) {
      console.log(tweets);
    }
  });
  
 client.get('search/tweets', {q: 'twice'}, function(error, tweets, response) {
  //console.log(tweets);
  //data = data.concat(tweets);
});


const gettwitt = () => {
  client.stream('statuses/filter', {track: '사나'},  function(stream) {
      stream.on('data', function(tweet) {
        //console.log(tweet.entities.media);
      });
    
      stream.on('error', function(error) {
        console.log(error);
      });
      return "test";
    });
};

let data = [];
const tweets = (params, max, callback) => {
  client.get('statuses/user_timeline', params, (error, results, response) => {
    if (error) {
      return callback(error);
    }
    
    data = data.concat(results);
    
    if(data.length <= max) {
      params.max_id = results.pop().id;

      return tweets(params, max, callback);
    }
    
    return callback(error, data, response);
  });
}

tweets({screen_name: 'jack', count: 10}, 50, (error, tweets, response) => {
  if (!error) {
    //console.log(tweets);
  }
});

const te = () => {
  console.log("Test");
  return "test is work";
};

const cube = (x) => {
  return x * x * x;
}
const foo = Math.PI + Math.SQRT2;
*/
const USER_TOKEN = process.env.TWITTER_ACCESS_BEARER_TOKEN;  

  const consumer_key = process.env.TWITTER_CONSUMER_KEY;
  const consumer_secret = process.env.TWITTER_CONSUMER_SECRET;
  const access_token_key = process.env.TWITTER_ACCESS_TOKEN_KEY;
  const access_token_secret = process.env.TWITTER_ACCESS_TOKEN_SECRET;

export const tweetStream = async (text) => {

  const baseURL = "https://stream.twitter.com/1.1/statuses/filter.json";
  const searchParams = `?track=${text}`;
  const URL = baseURL + searchParams;
  const AuthStr = `Bearer ${USER_TOKEN}`;

  const tweetRequest =  await axios(URL, { 
      headers: { Authorization: 
      'OAuth oauth_consumer_key='+ consumer_key +
      'oauth_nonce='+consumer_secret +
      'oauth_signature=' + USER_TOKEN +
      'oauth_signature_method="HMAC-SHA1",' +
      'oauth_version="1.0",' +
      'oauth_token='+ access_token_key 
      } 
    });
  const tdata = tweetRequest;
  console.log(Authorization);
  //console.log(tdata);
  return tdata;
};

export const searchTopic = async (text,count) => {
  
  const type = "recent";
  const lang = "en";
  const baseURL = "https://api.twitter.com/1.1/search/tweets.json";
  
  const searchParams = `?q=${text}&lang=${lang}&result_type=${type}&count=${count}`;
  const URL = baseURL + searchParams;
  const AuthStr = `Bearer ${USER_TOKEN}`;

  const tweetRequest =  await axios(URL, { 
      headers: { Authorization: AuthStr }
    });
  const tdata = tweetRequest.data.statuses;
  return tdata;
};

console.log(tweetStream('twice'));
//console.log(searchTopic('twice'));




    
