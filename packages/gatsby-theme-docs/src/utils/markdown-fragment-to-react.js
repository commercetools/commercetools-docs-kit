import styled from '@emotion/styled';
import unified from 'unified';
import filter from 'unist-util-filter';
import markdown from 'remark-parse';
import remark2react from 'remark-react';
import frontmatter from 'remark-frontmatter';
import { designSystem, Markdown } from '@commercetools-docs/ui-kit';
import { Link } from '../components';

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
        p: Markdown.p,
        a: Link,
        h1: Heading,
        h2: Heading,
        h3: Heading,
        h4: Heading,
        h5: Heading,
        h6: Heading,
        thematicBreak: Markdown.thematicBreak,
        blockquote: Markdown.blockquote,
        ul: Markdown.ul,
        ol: Markdown.ol,
        li: Markdown.li,
        dl: Markdown.dl,
        dt: Markdown.dt,
        dd: Markdown.dd,
        table: Div,
        thead: Div,
        tbody: Div,
        tr: Markdown.ul,
        td: Markdown.li,
        th: Markdown.li,
        code: Markdown.code,
        pre: Markdown.code,
        em: Markdown.em,
        strong: Markdown.strong,
        delete: Markdown.delete,
        hr: Markdown.hr,
      },
    })
    .processSync(markdownString).result;

export default markdownFragmentToReact;
