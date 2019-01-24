module.exports = function(eleventyConfig) {


  //  Active link shortcode
  eleventyConfig.addNunjucksShortcode("active", function(url, path) {
    return path == url ? `class="active"` : null;
  });


  // Get only content that matches a tag of "edition"
  eleventyConfig.addCollection("editions", function(collection) {
    return collection.getFilteredByTag("edition");
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
