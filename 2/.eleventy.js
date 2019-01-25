module.exports = function(eleventyConfig) {


  //  Active link shortcode
  eleventyConfig.addNunjucksShortcode("active", function(url, path) {
    return path == url ? `class="active"` : null;
  });


  /*
    collections
  */

  // Get only content that matches a tag of "edition"
  eleventyConfig.addCollection("editions", function(collection) {
    return collection.getFilteredByTag("edition");
  });

  // A collection of editions with future dates
  eleventyConfig.addCollection("futureEditions", function(collection) {
    var now = new Date();
    return collection.getFilteredByTag("edition").filter(function(item) {
      var when = new Date(item.data.date);
      return now - when < 0 ? true : false;
    });
  });

  // A collection of editions with dates in the past
  eleventyConfig.addCollection("previousEditions", function(collection) {
    var now = new Date();
    return collection.getFilteredByTag("edition").filter(function(item) {
      var when = new Date(item.data.date);
      return now - when < 0 ? false : true;
    });
  });


  // Add filters and formatters
  eleventyConfig.addFilter("dateDisplay", require("./src/site/_filters/dates.js") );


  // other config settings
  return {
    dir: {
      input: "src/site",
      output: "dist"
    },
    templateFormats : ["njk", "md"],
    htmlTemplateEngine : "njk",
    markdownTemplateEngine : "njk"
  };

};
