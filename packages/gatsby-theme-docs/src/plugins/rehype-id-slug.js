const visit = require('unist-util-visit');
const hasProperty = require('hast-util-has-property');
const headingRank = require('hast-util-heading-rank');
const toString = require('hast-util-to-string');
const Slugger = require('github-slugger');

const slugs = new Slugger();

/**
 * This plugins is a re-implementation of rehype-slug https://github.com/rehypejs/rehype-slug
 * The purpose of the plugin is to add id to headings based on the text content.
 * This re-implementation simply ensure that the ids get preProcess by a custom `preProcess` function, the
 * rest of the implementation works exactly like the original.
 */
module.exports =
  (options = {}) =>
  (tree) => {
    slugs.reset();
    const preProcess = options.preProcess || ((input) => input);
    visit(tree, 'element', (node) => {
      if (headingRank(node) && node.properties && !hasProperty(node, 'id')) {
        const nodeSlug = slugs.slug(preProcess(toString(node)));
        node.properties.id = nodeSlug;
      }
    });
  };