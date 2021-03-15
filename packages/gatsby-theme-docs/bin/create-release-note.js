#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const slugify = require('slugify');
const prompts = require('prompts');
const moment = require('moment');

const questions = [
  {
    type: 'multiselect',
    name: 'type',
    message: 'Pick the type of the release note',
    choices: [
      {
        title: 'enhancement',
        value: 'enhancement',
        description: 'for updates of existing features',
      },
      {
        title: 'feature',
        value: 'feature',
        description: 'for the introduction of an entirely new feature',
      },
      {
        title: 'fix',
        value: 'fix',
        description: 'for bug fixes',
      },
      {
        title: 'announcement',
        value: 'announcement',
        description:
          'for release notes with no product change nor immediate product change',
      },
    ],
  },
  {
    type: 'text',
    name: 'date',
    message: 'Insert the release date with the following format: 2021-01-21',
    validate: (date) => {
      const checkDateFormat = moment(date, 'YYYY-MM-DD', true);
      return checkDateFormat.isValid() ? true : 'Please use a valid format!';
    },
  },
  {
    type: 'text',
    name: 'title',
    message: 'Insert the title for the release note. Write it in plain text.',
    validate: (title) =>
      title.length > 256 ? 'Title is longer than 256 chars!' : true,
  },
  {
    type: 'text',
    name: 'description',
    message:
      'Describe the key changes and their advantages briefly. Max 256 character plain text. This text is tweet-able and used in RSS feeds.',
    validate: (description) =>
      description.length > 256 ? 'Description is longer than 256 chars!' : true,
  },
  {
    type: 'list',
    name: 'topics',
    message:
      'Fill in the topics for this release note. Seperate them with commas.',
    separator: ',',
  },
];

(async () => {
  if (!fs.existsSync(path.join(process.cwd(), `src/releases`))) {
    console.error(`No "releases" folder found in this directory`);
    process.exit();
  }

  const response = await prompts(questions);

  const template = `---
date: ${response.date}
title: ${response.title}
description: |
  ${response.description}
type: ${response.type}
topics:
${response.topics.map((topic) => `  - ${topic}`).join('\n')}
---

Please write the content here. To use "Read More", insert <!--more-->.
`;

  const filemane = response.title.replace(/\s+/g, '-').toLowerCase();

  fs.writeFileSync(
    path.join(process.cwd(), `src/releases/${slugify(filemane, '-')}.mdx`),
    template
  );
})();
