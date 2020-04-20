import styled from '@emotion/styled';
import unified from 'unified';
import filter from 'unist-util-filter';
import markdown from 'remark-parse';
import remark2react from 'remark-react';
import frontmatter from 'remark-frontmatter';
import { designSystem } from '@commercetools-docs/ui-kit';
import components from '../markdown-components';

const Div = styled.div``;
const Heading = styled.p`
  font-weight: ${designSystem.typography.fontWeights.bold};
`;

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
        h1: Heading,
        h2: Heading,
        h3: Heading,
        h4: Heading,
        h5: Heading,
        h6: Heading,
        thematicBreak: components.thematicBreak,
        blockquote: components.blockquote,
        ul: components.ul,
        ol: components.ol,
        li: components.li,
        dl: components.dl,
        dt: components.dt,
        dd: components.dd,
        table: Div,
        thead: Div,
        tbody: Div,
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
