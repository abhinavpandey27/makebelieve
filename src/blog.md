---
templateEngineOverride: njk,md
layout: layouts/blog-feed.njk
metaTitle: 'Abhinav Pandey - Blog Posts'
metaDescription: 'Consolidated resources and my other writings'
title: 'Abhinav Pandey - Blog Posts'
description: Consolidated resources and my other writings
eleventyNavigation:
  key: Blog
sideInfo:
    title: 'Work and Craft'
    subtext: 'Thoughts on the future of work, from the people and teams creating it.'
pagination:
  data: collections.blog
  size: 15
permalink: 'blog{% if pagination.pageNumber > 0 %}/page/{{ pagination.pageNumber }}{% endif %}/index.html'
paginationPrevText: 'Newer posts'
paginationNextText: 'Older posts'
paginationAnchor: '#post-list'
---


