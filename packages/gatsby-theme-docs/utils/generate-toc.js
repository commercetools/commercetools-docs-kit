// loaded via require because we use the pre-ESM version at the moment.
// to be changed once upgraded to a latest version
const githubSlugger = require('github-slugger');
const preProcessSlug = require('./slug-pre-process');
const slugger = githubSlugger();

async function generateToC(ast, maxDepth = 6) {
  const toc = (await import('mdast-util-toc')).toc;
  const toString = (await import('mdast-util-to-string')).toString;
  const generatedToC = toc(ast, { maxDepth });
  slugger.reset();
  return processToC(generatedToC.map, {}, toString);
}

function processToC(node, current, toString) {
  if (!node) {
    return {};
  }

  switch (node.type) {
    case `paragraph`: {
      current.title = toString(node);
      const nodeSlug = slugger.slug(preProcessSlug(current.title));
      current.url = `#${nodeSlug}`;
      return current;
    }

    case `list`: {
      current.items = node.children.map((item) =>
        processToC(item, {}, toString)
      );
      return current;
    }

    case `listItem`: {
      if (node.children.length) {
        const heading = processToC(node.children[0], {}, toString);

        if (node.children.length > 1) {
          processToC(node.children[1], heading, toString);
        }

        return heading;
      }
      break;
    }

    default:
      return null;
  }

  return {};
}

module.exports = generateToC;
