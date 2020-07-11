require("dotenv").config();
const Twit = require('twit');

const T = new Twit({

  consumer_key: process.env.consumer_key,

  consumer_secret: process.env.consumer_secret,

  access_token: process.env.access_token,

  access_token_secret: process.env.access_token_secret

});


// start stream and track tweets

const stream = T.stream('statuses/filter', {track: ['#vue','#vuejs','#vue.js','#Vue.js','#Vuejs','#vuex','#vuetify']});


// use this to log errors from requests

function responseCallback (err, data, response) {

 console.log(err);

}


// event handler

stream.on('tweet', tweet => {

   // retweet

  T.post('statuses/retweet/:id', {id: tweet.id_str}, responseCallback);

  // like

  T.post('favorites/create', {id: tweet.id_str}, responseCallback);

});