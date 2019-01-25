const axios  = require('axios');
const toJSON = require('xml2js').parseString;
const fs     = require("fs");

const url = 'https://medium.com/feed/netlify';
const env = process.env.ELEVENTY_ENV;

module.exports = () => {
  return new Promise((resolve, reject) => {
    axios.get(url)
      .then((response) => {
        // turn the feed XML into JSON
        toJSON(response.data, function (err, result) {
          // create a path for each item based on Medium's guid URL
          result.rss.channel[0].item.forEach(element => {
            var url = element.link[0].split('/');
            element.path = url[url.length-1].split('?')[0];
          });

          var json = {'url': url, 'posts': result.rss.channel[0].item};

          // Handy to save the results to a local file
          // to prime the dev data source
          if(env == 'seed') {
            fs.writeFile(__dirname + '/../dev/medium.json', JSON.stringify(json), err => {
              if(err) {
                console.log(err);
              } else {
                console.log("Proposal submissions content primed for dev.");
              }
            });
          }

          resolve(json);
        });
      })
      .catch((error) => {
        reject(error);
      });
  });
};
