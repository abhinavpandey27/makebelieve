const htmlmin = require('html-minifier');
const sortByDisplayOrder = require('./src/utils/sort-by-display-order.js');
const markdownIt = require('markdown-it')
const markdownitlinkatt = require('markdown-it-link-attributes')
const markdownItAnchor = require('markdown-it-anchor')
const classNames = require('classnames')





module.exports = function(eleventyConfig) {
  /**
   * Files to copy
   * https://www.11ty.dev/docs/copy/
   */
  eleventyConfig.addPassthroughCopy('src/img')
  eleventyConfig.addPassthroughCopy('src/fonts')

  const eleventyNavigationPlugin = require("@11ty/eleventy-navigation");
  eleventyConfig.addPlugin(eleventyNavigationPlugin);



 
  
 



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


  return {

    dir: {
      input: "src",
      data: "../_data"
    }
  };
};


/* Diwali Day Image Plugin Stuff (put on top of exports if needed)
const ImageWidths = {
  ORIGINAL: null,
  PLACEHOLDER: 24,
};

const imageShortcode = async (
  relativeSrc,
  alt,
  className,
  widths = [400, 800, 1280],
  width = 2000,
  height = 1500,
  formats = ['jpeg', 'webp'],
  baseFormat = 'jpeg',
  optimizedFormats = ['webp'],
  sizes = '100vw'
) => {
 /* const { dir: imgDir } = path.parse(relativeSrc); * /
  
 const { name: imgName, dir: imgDir } = path.parse(relativeSrc);
 const fullSrc = path.join('src', relativeSrc);

  const imageMetadata = await Image(fullSrc, {
    widths: [ImageWidths.ORIGINAL, ImageWidths.PLACEHOLDER, ...widths],
    formats: [...optimizedFormats, baseFormat],
    outputDir: path.join('_site', imgDir),
    urlPath: imgDir,
  filenameFormat: (hash, _src, width, format) => {
      const suffix = width === ImageWidths.PLACEHOLDER ? 'placeholder' : width;
      return `${imgName}-${hash}-${suffix}.${format}`; 
    }, 
  });

  // Map each unique format (e.g., jpeg, webp) to its smallest and largest images
const formatSizes = Object.entries(imageMetadata).reduce((formatSizes, [format, images]) => {
  if (!formatSizes[format]) {
    const placeholder = images.find((image) => image.width === ImageWidths.PLACEHOLDER);
    // 11ty sorts the sizes in ascending order under the hood
    const largestVariant = images[images.length - 1];

    formatSizes[format] = {
      placeholder,
      largest: largestVariant,
    };
  }
  return formatSizes;
}, {});



 // Chain class names w/ the classNames package; optional
const picture = `<picture class="${classNames('lazy-picture', className)}">
${Object.values(imageMetadata)
  // Map each format to the source HTML markup
  .map((formatEntries) => {
    // The first entry is representative of all the others since they each have the same shape
    const { format: formatName, sourceType } = formatEntries[0];

    const placeholderSrcset = formatSizes[formatName].placeholder.url;
    const actualSrcset = formatEntries
      // We don't need the placeholder image in the srcset
      .filter((image) => image.width !== ImageWidths.PLACEHOLDER)
      // All non-placeholder images get mapped to their srcset
      .map((image) => image.srcset)
      .join(', ');

    return `<source type="${sourceType}" srcset="${placeholderSrcset}" data-srcset="${actualSrcset}" data-sizes="${sizes}">`;
  })
  .join('\n')}
  <img
    src="${formatSizes[baseFormat].largest.url}"
    data-src="${formatSizes[baseFormat].largest.url}"
    width="${width}"
    height="${height}"
    alt="${alt}"
    class="lazy-img"
    loading="lazy">
</picture>`;

return picture;

};

*/