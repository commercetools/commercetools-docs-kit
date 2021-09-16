import React from 'react';
import styled from '@emotion/styled';
import { unified } from 'unified';
import { filter } from 'unist-util-filter';
import rehypeReact from 'rehype-react';
import remarkParse from 'remark-parse';
import remarkFrontmatter from 'remark-frontmatter';
import remarkRehype from 'remark-rehype';
import { designSystem, Markdown } from '@commercetools-docs/ui-kit';
import Link from '../components/link';

const Div = styled.div``;
const Heading = styled.p`
  font-weight: ${designSystem.typography.fontWeights.bold};
`;
// No images should be rendered in fragments that are embedded into other layouts
const MarkdownFragmentImage = () => null;

/**
 * Takes a markdown string and returns a react component rendering it
 * in a way that is safe to embed into arbitrary places of a larger document.
 * Therefore it does not render structural elements and elements that would visually
 * break if embedded into a table cell, list item or preview fragment in an article list.
 * - headings rendered as strong emphasis, but not structural headings
 * - tables rendered as bullet lists (one list per row)
 * - code blocks rendered as inline code
 * - none of the custom MDX components available -> for example subtitle
 *
 * Elements can be customized with the customElements object, its structure should be like so:
 * {
 *  a: <custom-anchor-tag>,
 *  p: <custom-paragrapgh-tag>,
 * }
 *
 * @param {String} markdownString
 * @param {Object} customElements
 */
const removeFrontmatterPlugin = () => (tree) =>
  filter(tree, (node) => node.type !== 'yaml');
const noOpPlugin = () => (ast) => ast;
const markdownFragmentToReact = (
  markdownString,
  customElements,
  customPlugin
) => {
  const safeCustomPlugin =
    typeof customPlugin === 'function' ? customPlugin : noOpPlugin;
  return unified()
    .use(remarkParse)
    .use(remarkFrontmatter)
    .use(removeFrontmatterPlugin)
    .use(safeCustomPlugin)
    .use(remarkRehype)
    .use(rehypeReact, {
      createElement: React.createElement,
      Fragment: React.Fragment,
      components: {
        p: Markdown.Paragraph,
        a: Link,
        h1: Heading,
        h2: Heading,
        h3: Heading,
        h4: Heading,
        h5: Heading,
        h6: Heading,
        thematicBreak: Markdown.ThematicBreak,
        blockquote: Markdown.Blockquote,
        ul: Markdown.Ul,
        ol: Markdown.Ol,
        li: Markdown.Li,
        dl: Markdown.Dl,
        dt: Markdown.Dt,
        dd: Markdown.Dd,
        table: Div,
        thead: Div,
        tbody: Div,
        tr: Markdown.Ul,
        td: Markdown.Li,
        th: Markdown.Li,
        code: Markdown.InlineCode,
        pre: Markdown.InlineCode,
        em: Markdown.Em,
        strong: Markdown.Strong,
        delete: Markdown.Delete,
        hr: Markdown.Hr,
        img: MarkdownFragmentImage,
        ...customElements,
      },
    })
    .processSync(markdownString).result;
};
export default markdownFragmentToReact;
