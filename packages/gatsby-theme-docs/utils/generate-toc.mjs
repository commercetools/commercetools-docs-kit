import GithubSlugger from 'github-slugger';
import preProcessSlug from './slug-pre-process.mjs';

const slugger = new GithubSlugger();

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
      // remove any tag from the string (needed only for mdx v1)
      const htmlTagsRegex = /<[^>]+>/g;
      current.title = toString(node).replace(htmlTagsRegex, '');
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

export default generateToC;
