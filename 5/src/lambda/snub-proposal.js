// neltify-lambda will package the deps in for us.
const request = require("request");

// populate environment variables locally.
require('dotenv').config()

// All calls to the Netlify API will need an auth token
const AUTH = process.env.NETLIFY_AUTH;



// Lambda function handler
exports.handler = function(event, context, callback) {

  const id = event.queryStringParameters.id;
  const url = `https://api.netlify.com/api/v1/submissions/${id}?access_token=${AUTH}`;

  request.delete(url, function(err, response, body){
    if(err){
      return console.log(err);
    } else {
      console.log("Comment deleted from queue.");

      // trigger a rebuild?

      // tell the user
      callback(null, {
        statusCode: 301,
        headers: {
          Location: '/gone.md',
        }
      });
    }
  });

};


