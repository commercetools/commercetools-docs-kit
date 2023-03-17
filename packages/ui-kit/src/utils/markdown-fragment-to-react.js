import React from 'react';
import styled from '@emotion/styled';
import { unified } from 'unified';
import filter from 'unist-util-filter';
import rehypeReact from 'rehype-react';
import remarkParse from 'remark-parse';
import remarkFrontmatter from 'remark-frontmatter';
import remarkRehype from 'remark-rehype';
import * as designSystem from '../design-system';
import * as Markdown from '../components/markdown';
import Link from '../components/link';

// This utility is voluntarily left as javascript and only exposes its function signature
// with types. Type modeling the ast transform chaining would be very abstract, require a lot
// of understanding of the rehype / remark / unified infrastructure with little gain.

const Div = styled.div``;
const Heading = styled.p`
  font-weight: ${designSystem.typography.fontWeights.bold};
`;
// No images should be rendered in fragments that are embedded into other layouts
const MarkdownFragmentImage = () => null;

const removeFrontmatterPlugin = () => (tree) =>
  filter(tree, (node) => node.type !== 'yaml');

const noOpPlugin = () => (ast) => ast;

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
 *  a: custom-link-component,
 *  p: custom-paragraph-component,
 * }
 *
 * @param {string}  markdownString
 * @param {Object.<string, React.ComponentType>} customElements - custom HTML element to component mapping
 * @param {function} customPlugin - additional remark plugins to be applied before processing
 * @returns {React.ReactNode} -
 */
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
