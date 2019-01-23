module.exports = function(eleventyConfig) {

  eleventyConfig.addFilter("dateDisplay", require("./src/site/_filters/dates.js") );
  eleventyConfig.addFilter("future", require("./src/site/_filters/future.js") );

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

  // Nunjucks active link shortcode
  eleventyConfig.addNunjucksShortcode("active", function(url, path) {
    return path == url ? `class="active"` : null;
  });




  // RSS plugin
  const pluginRss = require("@11ty/eleventy-plugin-rss");
  eleventyConfig.addPlugin(pluginRss);


  // minify the html output
  const htmlmin = require("html-minifier");
  eleventyConfig.addTransform("htmlmin", function(content, outputPath) {
    if( outputPath.endsWith(".html") ) {
      let minified = htmlmin.minify(content, {
        useShortDoctype: true,
        removeComments: true,
        collapseWhitespace: true
      });
      return minified;
    }
    return content;
  });


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
