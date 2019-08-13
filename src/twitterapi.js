import axios from 'axios';
import oauth from 'oauth';  

const USER_TOKEN = process.env.TWITTER_ACCESS_BEARER_TOKEN;  

  const consumer_key = process.env.TWITTER_CONSUMER_KEY;
  const consumer_secret = process.env.TWITTER_CONSUMER_SECRET;
  const access_token_key = process.env.TWITTER_ACCESS_TOKEN_KEY;
  const access_token_secret = process.env.TWITTER_ACCESS_TOKEN_SECRET;

  function getAuthorization(httpMethod, baseUrl, reqParams) {
    
    // Get acces keys
    const consumerKey       = process.env.TWITTER_CONSUMER_KEY,
        consumerSecret      = process.env.TWITTER_CONSUMER_SECRET,
        accessToken         = process.env.TWITTER_ACCESS_TOKEN_KEY,
        accessTokenSecret   = process.env.TWITTER_ACCESS_TOKEN_SECRET;
  
    //헤더파일 인증 생성
    var consumer = new oauth.OAuth(
      "https://twitter.com/oauth/request_token", "https://twitter.com/oauth/access_token", 
      consumerKey ,  consumerSecret, "1.0A", "http://127.0.0.1:8080/sessions/callback", "HMAC-SHA1");
    var parameters2 = consumer._prepareParameters(accessToken, accessTokenSecret, httpMethod, baseUrl);
    var headers = consumer._buildAuthorizationHeaders(parameters2);
   
    console.log(headers);  
    return headers;
   
    }


  //test 필요
export const tweetStream = async (text) => {

  const baseURL = "https://stream.twitter.com/1.1/statuses/filter.json";
  const searchParams = `?track=${text}`;
  const URL = baseURL + searchParams;
  const AuthStr = `Bearer ${USER_TOKEN}`;

  const tweetRequest =  await axios(URL, { 
      headers: { Authorization: 
      'OAuth oauth_consumer_key='+ consumer_key + '", ' +
      'oauth_nonce='+consumer_secret + '", ' +
      'oauth_signature=' + USER_TOKEN + '", ' +
      'oauth_signature_method="HMAC-SHA1",' +
      'oauth_version="1.0",' +
      'oauth_token='+ access_token_key + '",'
      } 
    });
  const tdata = tweetRequest;
  console.log(Authorization);
  //console.log(tdata);
  return tdata;
};


export const searchUser = async (text) => {
  
  const baseURL = "https://api.twitter.com/1.1/users/search.json";
  
  const searchParams = `?q=${text}`;
  const URL = baseURL + searchParams;
  
  const tweetRequest =  await axios(URL, { 
    headers: {
      Authorization: getAuthorization(
          'GET',
          URL
      )
  }
    });
    console.log(tdata)  
  const tdata = tweetRequest.data;
  console.log(tdata)
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
  //console.log(AuthStr)
  return tdata;
};

/*
console.log(getAuthorization(
  'GET',
  'https://api.twitter.com/1.1/users/search.json?q=twice',
));
*/
console.log(searchUser('BTS'));
//onsole.log(searchTopic('twice'));

