import styled from '@emotion/styled';
import {
  Markdown,
  Link,
  Subtitle,
  ContentNotifications,
  TextSmall,
} from '@commercetools-docs/ui-kit';

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

  // Official react components to be used in MDX files
  Subtitle,
  TextSmall,
  Info: ContentNotifications.Info,
  Warning: ContentNotifications.Warning,
  Error: ContentNotifications.Error,
};

const Aside = styled.aside({
  position: 'absolute',
  right: '1rem',
  top: '1rem',
  background: 'yellow',
  padding: '0.5em',
});
export default {
  ...components,
  Aside,
};
