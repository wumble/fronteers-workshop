const axios = require("axios");
const fs    = require("fs");

require('dotenv').config()

const AUTH = process.env.NETLIFY_AUTH;
const FORM_ID = process.env.PROPOSALS_FORM_ID;
const url = `https://api.netlify.com/api/v1/forms/${FORM_ID}/submissions/?access_token=${AUTH}`;
const env = process.env.ELEVENTY_ENV;


module.exports = () => {
  return new Promise((resolve, reject) => {
    axios.get(url)
      .then(response => {

        // massage the response into the shape we would like to use
        var data = [];
        for(submission in response.data) {
          var entry = response.data[submission].data;
          entry.date = response.data[submission].created_at;
          data.push(entry);
        }

        // Handy to save the results to a local file
        // to prime the dev data source
        if(env == 'seed') {
          fs.writeFile(__dirname + '/../dev/proposals.json', JSON.stringify(data), err => {
            if(err) {
              console.log(err);
            } else {
              console.log("Proposal submissions content primed for dev.");
            }
          });
        }

        resolve(data);
      })
      .catch(err => {
        reject(err);
      });
  })
}

