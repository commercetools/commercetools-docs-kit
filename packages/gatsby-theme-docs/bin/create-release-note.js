#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const slugify = require('slugify');
const prompts = require('prompts');
const { cosmiconfigSync } = require('cosmiconfig');

const moduleName = 'docs-release-notes-config';
const explorerSync = cosmiconfigSync(moduleName, {
  searchPlaces: [`${moduleName}.yml`, `${moduleName}.yaml`],
});
const configFile = explorerSync.search();

const selectQuestions = (customizedQuestions) => {
  return [
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
        description.length > 256
          ? 'Description is longer than 256 chars!'
          : true,
    },
    customizedQuestions,
  ];
};

(async () => {
  const folderpath = path.join(process.cwd(), `src/releases`);
  if (!fs.existsSync(folderpath)) {
    console.error(`No "releases" folder found in this directory`);
    process.exit();
  }

  const getQuestions = () => {
    if (configFile) {
      const topics = configFile.config.topics.map((topic) => ({
        title: topic.name,
        value: topic.name,
        description: topic.description,
      }));
      const multiselectTopicQuestion = {
        type: 'multiselect',
        name: 'topics',
        message: 'Select the topics for this release note.',
        choices: topics,
      };
      return selectQuestions(multiselectTopicQuestion);
    }
    const listTopicQuestion = {
      type: 'list',
      name: 'topics',
      message:
        'No topic configuration found. Please fill in the topics for this release note. Seperate them with commas.',
      separator: ',',
    };
    return selectQuestions(listTopicQuestion);
  };

  const response = await prompts(getQuestions());

  const template = `---
date: '${new Date().toISOString()}'
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
    path.join(`${folderpath}/${slugify(filemane, '-')}.mdx`),
    template
  );
})();
