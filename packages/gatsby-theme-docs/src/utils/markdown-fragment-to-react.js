import unified from 'unified';
import filter from 'unist-util-filter';
import markdown from 'remark-parse';
import remark2react from 'remark-react';
import frontmatter from 'remark-frontmatter';
import components from '../markdown-components';

/**
 * Takes a markdown string and returns a react component rendering it
 * in a way that is safe to embed into arbitrary places of a larger document.
 * Therefore it does not render structural elements and elements that would visually
 * break if embedded into a table cell, list item or preview fragment in an article list.
 * - headings rendered as strong emphasis, but not structural headings
 * - tables rendered as bullet lists (one list per row)
 * - code blocks rendered as inline code
 * - none of the custom MDX components available -> for example subtitle
 * @param {String} markdownString
 */

const removeFrontmatter = () => (tree) =>
  filter(tree, (node) => node.type !== 'yaml');
const markdownFragmentToReact = (markdownString) =>
  unified()
    .use(markdown, { commonmark: true })
    .use(frontmatter)
    .use(removeFrontmatter)
    .use(remark2react, {
      sanitize: true,
      remarkReactComponents: {
        p: components.p,
        a: components.a,
        h1: components.strong,
        h2: components.strong,
        h3: components.strong,
        h4: components.strong,
        h5: components.strong,
        h6: components.strong,
        thematicBreak: components.thematicBreak,
        blockquote: components.blockquote,
        ul: components.ul,
        ol: components.ol,
        li: components.li,
        dl: components.dl,
        dt: components.dt,
        dd: components.dd,
        table: components.p,
        tr: components.ul,
        td: components.li,
        th: components.li,
        code: components.code,
        pre: components.code,
        em: components.em,
        strong: components.strong,
        delete: components.delete,
        hr: components.hr,
      },
    })
    .processSync(markdownString).result;

export default markdownFragmentToReact;
