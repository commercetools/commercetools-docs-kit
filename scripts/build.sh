#!/usr/bin/env bash

set -e

echo "Preparing production builds."

yarn build-packages
yarn generate-icons
yarn node ./scripts/gatsby-cache.mjs pre

echo "Building Gatsby websites."

yarn workspace @commercetools-website/api-docs-smoke-test build
yarn workspace @commercetools-website/docs-smoke-test build
yarn workspace @commercetools-website/documentation build
yarn workspace @commercetools-website/site-template build
yarn workspace @commercetools-website/self-learning-smoke-test build

yarn node ./scripts/gatsby-cache.mjs post

echo "Copying test index.html file into public folder."

cp -f ./websites/index.html ./public

