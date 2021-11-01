const htmlmin = require('html-minifier');
const sortByDisplayOrder = require('./src/utils/sort-by-display-order.js');
const markdownIt = require('markdown-it')
const markdownitlinkatt = require('markdown-it-link-attributes')
const markdownItAnchor = require('markdown-it-anchor')



module.exports = function(eleventyConfig) {
  /**
   * Files to copy
   * https://www.11ty.dev/docs/copy/
   */
  eleventyConfig.addPassthroughCopy('src/img')
  eleventyConfig.addPassthroughCopy('src/fonts')

  const eleventyNavigationPlugin = require("@11ty/eleventy-navigation");
  eleventyConfig.addPlugin(eleventyNavigationPlugin);
  
  /**
   * HTML Minifier for production builds
   */
  eleventyConfig.addTransform('htmlmin', function (content, outputPath) {
    if (
      process.env.ELEVENTY_ENV == 'production' &&
      outputPath &&
      outputPath.endsWith('.html')
    ) {
      let minified = htmlmin.minify(content, {
        useShortDoctype: true,
        removeComments: true,
        collapseWhitespace: true,
      })
      return minified
    }


    return content
  })


  const pluginTOC = require('eleventy-plugin-nesting-toc');
  
  eleventyConfig.addPlugin(pluginTOC, {tags: ['h1, h2, h3, h4']}, {headingText: 'Table of Contents'});
    	/* Markdown Overrides */
	let markdownLibrary = markdownIt({
		html: true,
		breaks: true
	})
  /* Markdown Overrides 
		.use(markdownitlinkatt, {
			pattern: /^(?!(https:\/\/kailoon\.com|#)).*$/gm,
			attrs: {
				target: '_blank',
				rel: 'noreferrer'
			}
		}) */
		.use(markdownItAnchor, {
      html:true,
      linkify: true,
      typographer: true,
		/*	permalink: true,
			permalinkClass: 'no-underline direct-link text-gray-400 dark:text-gray-600',
			permalinkSymbol: '#',
      visuallyHiddenClass: 'visually-hidden',
			permalinkAttrs: (slug, state) => ({
				'aria-label': `permalink to ${slug}`,
				title: 'Anchor link for easy sharing.'
			}) */
		})
	eleventyConfig.setLibrary('md', markdownLibrary)

    // Returns work items, sorted by display order
    eleventyConfig.addCollection('work', collection => {
      return sortByDisplayOrder(collection.getFilteredByGlob('./src/work/*.md'));
    });

    // Returns work items, sorted by display order then filtered by featured
    eleventyConfig.addCollection('featuredWork', collection => {
      return sortByDisplayOrder(collection.getFilteredByGlob('./src/work/*.md')).filter(
        x => x.data.featured
      );
    });


  return {
    dir: {
      input: "src",
      data: "../_data"
    }
  };
};