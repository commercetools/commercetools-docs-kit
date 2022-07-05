import {
  ContentNotifications,
  Markdown,
  Subtitle,
  Mermaid,
} from '@commercetools-docs/ui-kit';
import {
  Card,
  Cards,
  Link,
  BetaFlag as Beta,
  Anchor,
  SideBySide,
} from './components';
import placeholderMarkdownComponents from './overrides/markdown-components';

// See https://mdxjs.com/getting-started#table-of-components
const components = {
  // UI components
  p: Markdown.Paragraph,
  // NOTE: we want to ensure that only one h1 exists on each page.
  // Therefore, we map the markdown header elements starting from h2.
  // The h1 header will be automatically rendered based on the page title.
  h1: Markdown.withCopyToClipboard(Markdown.H2) /* "Section" */,
  h2: Markdown.withCopyToClipboard(Markdown.H3) /* "Subsection" */,
  h3: Markdown.withCopyToClipboard(Markdown.H4) /* "Sub-Subsection" */,
  h4: Markdown.withCopyToClipboard(
    Markdown.H4
  ) /* "Sub-Subsection", not in  nav */,
  h5: Markdown.withCopyToClipboard(
    Markdown.H4
  ) /* "Sub-Subsection", not in  nav */,
  h6: Markdown.withCopyToClipboard(
    Markdown.H4
  ) /* "Sub-Subsection", not in  nav */,
  thematicBreak: Markdown.ThematicBreak,
  blockquote: Markdown.Blockquote,
  ul: Markdown.Ul,
  ol: Markdown.Ol,
  li: Markdown.Li,
  dl: Markdown.Dl,
  dt: Markdown.Dt,
  dd: Markdown.Dd,
  table: Markdown.Table,
  tr: Markdown.TableRow,
  td: Markdown.TableCell,
  th: Markdown.TableHeader,
  code: Markdown.InlineCode,
  inlineCode: Markdown.InlineCode,
  em: Markdown.Em,
  strong: Markdown.Strong,
  delete: Markdown.Delete,
  hr: Markdown.Hr,
  pre: Markdown.CodeBlock,
  // Custom component specific to the Gatsby theme
  a: Link,

  // Official react components to be used in MDX files
  Subtitle,
  Info: ContentNotifications.Info,
  Warning: ContentNotifications.Warning,
  Error: ContentNotifications.Error,
  Beta,
  Anchor,
  Card,
  Cards,
  SideBySide,
  Mermaid,

  // Custom React components that can be injected from each website
  // See ../overrides/README.md
  ...placeholderMarkdownComponents,
};

export default components;
