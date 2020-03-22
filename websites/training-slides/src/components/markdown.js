import { Markdown, Link } from '@commercetools-docs/ui-kit';

const components = {
  p: Markdown.Paragraph,
  h1: Markdown.H1,
  h2: Markdown.H3,
  h3: Markdown.H4,
  h4: Markdown.H5,
  h5: Markdown.H6,
  h6: Markdown.H6,
  blockquote: Markdown.Blockquote,
  ul: Markdown.Ul,
  ol: Markdown.Ol,
  li: Markdown.Li,
  table: Markdown.Table,
  tr: Markdown.TableRow,
  td: Markdown.TableCell,
  th: Markdown.TableHeader,
  code: Markdown.InlineCode,
  inlineCode: Markdown.InlineCode,
  em: Markdown.Em,
  strong: Markdown.Strong,
  delete: Markdown.Delete,
  a: Link,
  // eslint-disable-next-line react/display-name
  pre: Markdown.CodeBlock,
};

export default {
  ...components,
};
