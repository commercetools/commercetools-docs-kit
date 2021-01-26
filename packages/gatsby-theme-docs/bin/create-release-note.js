#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const slugify = require('slugify');
const prompts = require('prompts');

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
    type: 'date',
    name: 'date',
    message: 'Pick a release date',
  },
  {
    type: 'text',
    name: 'title',
    message: 'The title of the release note. Max 256 character plain text.',
    validate: (title) =>
      title.length > 256 ? 'Title is longer than 256 chars!' : true,
  },
  {
    type: 'text',
    name: 'description',
    message:
      'Key changes and their advantages. Max 256 character plain text. This text is tweet-able and used in RSS feeds.',
    format: (val, values) => `${values.title} ${val}`,
    validate: (description) =>
      description.length > 256 ? 'Description is longer than 256 chars!' : true,
  },
  {
    type: 'list',
    name: 'topics',
    message:
      'Write down the topics for this release note. Seperate them with commas.',
    separator: ',',
  },
];

(async () => {
  const response = await prompts(questions);

  const template = `---
date: ${response.date}
title: ${response.title}
description: |
  ${response.description}
type: ${response.type}
topics:
${response.topics
  .map((topic) => {
    return `- ${topic}
`;
  })
  .toString()
  .replace(/,/g, '')}
---

Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut sit amet tristique arcu. Nullam et porta urna.
Suspendisse potenti. Sed euismod eleifend sapien, et bibendum velit sollicitudin quis.
Proin iaculis mauris in porttitor facilisis.

<!--more-->
`;

  fs.writeFileSync(
    path.join(
      process.cwd(),
      `src/releases/${slugify(response.title, '-')}.mdx`
    ),
    template
  );
})();
