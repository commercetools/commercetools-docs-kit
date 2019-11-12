import unified from 'unified';
import markdown from 'remark-parse';
import remark2react from 'remark-react';

export default function markdown2React(markdownString) {
  const result = unified()
    .use(markdown, { commonmark: true })
    .use(remark2react)
    .processSync(markdownString).contents;

  return result;
}
