const githubSlugger = require('github-slugger');

const slugger = githubSlugger();

function processTableOfContentFields(tableOfContents, level = 0) {
  const returnedTableOfContents = {};

  Object.keys(tableOfContents).forEach((key) => {
    if (key === 'title') {
      const titleWithoutJsx = tableOfContents[key]
        .replace(/<(\w+)[^>]*>.*<\/\1>/gi, '') // remove jsx with texts between - https://www.webdeveloper.com/d/252483-regex-to-strip-html-and-content-between-tags/5
        .replace(/(<([^>]+)>)/gi, ''); // remove jsx - https://stackoverflow.com/questions/1499889/remove-html-tags-in-javascript-with-regex
      returnedTableOfContents[key] = titleWithoutJsx.trim();
      returnedTableOfContents.url = `#${slugger.slug(titleWithoutJsx)}`;
    }

    if (Array.isArray(tableOfContents[key])) {
      returnedTableOfContents[key] = tableOfContents[key].map((item) =>
        processTableOfContentFields(item, level + 1)
      );
    }
  });

  if (level === 0) {
    // only reset if no longer recursing
    slugger.reset();
  }
  return returnedTableOfContents;
}

module.exports = processTableOfContentFields;
