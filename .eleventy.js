const htmlmin = require('html-minifier');
const sortByDisplayOrder = require('./src/utils/sort-by-display-order.js');
const markdownIt = require('markdown-it')
const markdownitlinkatt = require('markdown-it-link-attributes')
const markdownItAnchor = require('markdown-it-anchor')
const classNames = require('classnames')
const UpgradeHelper = require("@11ty/eleventy-upgrade-help");







const Image = require("@11ty/eleventy-img");
const widths = [600, 1280];
const formats = ["webp", "jpeg"];
const sizes = "100vw";





module.exports = function(eleventyConfig) {
  /**
   * Files to copy
   * https://www.11ty.dev/docs/copy/
   */
  eleventyConfig.addPassthroughCopy('src/img')
  eleventyConfig.addPassthroughCopy('src/fonts')

  const eleventyNavigationPlugin = require("@11ty/eleventy-navigation");
  eleventyConfig.addPlugin(eleventyNavigationPlugin);

  eleventyConfig.addPlugin(UpgradeHelper);




/*
  const imageShortcode = async (src, alt) => {
    if (alt === undefined)
      throw new Error(`Missing "alt" on responsive image from: ${src}`);
    const srcPath = path.join(
      "src/img", // image asset source directory
      src
    );
    const imgDir = path.parse(src).dir;
    const metadata = await Image(srcPath, {
      widths,
      formats,
      outputDir: path.join(
        "_site/img", // output directory (relative to the project root)
        imgDir
      ),
      urlPath:
        "/img" + // output directory (relative to the site HTML files)
        imgDir,
    });
    return Image.generateHTML(metadata, {
      alt,
      sizes,
      loading: "lazy",
      decoding: "async",
      
    });
  };
  eleventyConfig.addNunjucksAsyncShortcode("image", imageShortcode);
  
 */

  const imageShortcode = async (src, alt) => {
    if (alt === undefined)
      throw new Error(`Missing "alt" on responsive image from: ${src}`);
    const srcPath = path.join(
      "src/images", // image asset source directory
      src
    );
    const imgDir = path.parse(src).dir;
    const metadata = await Image(srcPath, {
      widths,
      formats,
      outputDir: path.join(
        "_site/images", // output directory (relative to the project root)
        imgDir
      ),
      urlPath:
        "/images" + // output directory (relative to the site HTML files)
        imgDir,
    });
    return Image.generateHTML(metadata, {
      alt,
      sizes,
      loading: "lazy",
      decoding: "async",
    });
  };

  eleventyConfig.addNunjucksAsyncShortcode("image", imageShortcode);
  eleventyConfig.addLiquidShortcode("image", imageShortcode);
  eleventyConfig.addJavaScriptFunction("image", imageShortcode);

  

/*
	eleventyConfig.addShortcode('respimg', (path, alt, style) => {
		const fetchBase = `https://res.cloudinary.com/${eleventyConfig.cloudinaryCloudName}/image/upload/`
		const src = `${fetchBase}q_auto,f_auto,w_400/${path}.${eleventyConfig.format}`
		const srcset = eleventyConfig.srcsetWidths
			.map(({ w, v }) => {
				return `${fetchBase}dpr_auto,q_auto,w_${w}/makebelieve.pages.dev/${path}.${eleventyConfig.format} ${v}w`
			})
			.join(', ')

		return `<img class="${
			style ? style : ''
		}" loading="lazy" src="${src}" srcset="${srcset}" alt="${
			alt ? alt : ''
		}" width="400" height="300" sizes="100vw">`
	})

	eleventyConfig.addShortcode('figure', (path, alt, caption) => {
		const fetchBase = `https://res.cloudinary.com/${eleventyConfig.cloudinaryCloudName}/image/upload/`
		const src = `${fetchBase}q_auto,f_auto,w_400/https://makebelieve.pages.dev/${path}.${eleventyConfig.format}`
		const srcset = eleventyConfig.srcsetWidths
			.map(({ w, v }) => {
				return `${fetchBase}dpr_auto,q_auto,w_${w}/${path}.${eleventyConfig.format} ${v}w`
			})
			.join(', ')

		return `<figure class="mb-10"><img loading="lazy" src="${src}" srcset="${srcset}" alt="${
			alt ? alt : ''
		}" width="400" height="300"><figcaption class="text-center text-sm mt-3 text-gray-600 dark:text-gray-200">${
			caption ? caption : ''
		}</figcaption></figure>`
	})

	// https://github.com/eeeps/eleventy-respimg
	eleventyConfig.cloudinaryCloudName = 'abhinavonec'
	eleventyConfig.srcsetWidths = [
		{ w: 400, v: 400 },
		{ w: 600, v: 600 },
		{ w: 768, v: 768 },
		{ w: 820, v: 820 },
		{ w: 1240, v: 1240 }
	]
	eleventyConfig.format = 'webp'
	eleventyConfig.fallbackWidth = 800

  */



  
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

    // Returns a collection of blog posts in reverse date order
    eleventyConfig.addCollection('blog', collection => {
    return [...collection.getFilteredByGlob('./src/posts/*.md')].reverse();
    });


    // Returns a collection of blog posts in reverse date order
    eleventyConfig.addCollection('links', collection => {
    return [...collection.getFilteredByGlob('./src/links/**/**/*.md')].reverse();
    });


    function filterTagList(tags) {
      return (tags || []).filter(tag => ["all", "nav", "post", "posts"].indexOf(tag) === -1);
    }
  
    eleventyConfig.addFilter("filterTagList", filterTagList)

     const markdownItFootnote = require('markdown-it-footnote');
  
    // Create an array of all tags
    eleventyConfig.addCollection("tagList", function(collection) {
      let tagSet = new Set();
      collection.getAll().forEach(item => {
        (item.data.tags || []).forEach(tag => tagSet.add(tag));
      });
  
      return filterTagList([...tagSet]);
    });



     // https://html.spec.whatwg.org/multipage/common-microsyntaxes.html#valid-date-string
    eleventyConfig.addFilter('htmlDateString', (dateObj) => {
      return DateTime.fromJSDate(dateObj, {zone: 'utc'}).toFormat('yyyy-LL-dd');
    });


    const pluginDate = require("eleventy-plugin-date");
    eleventyConfig.addPlugin(pluginDate);

  return {

    dir: {
      input: "src",
      data: "../_data"
    }
  };
};


