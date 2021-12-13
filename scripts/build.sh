#!/usr/bin/env bash

set -e

echo "Preparing production builds."

yarn build-packages
yarn generate-icons
yarn node ./scripts/gatsby-cache.mjs pre

echo "Building Gatsby websites."

cross-env NODE_ENV=production yarn workspaces foreach --include '@commercetools-website/*' run build
yarn node ./scripts/gatsby-cache.mjs post

echo "Copying test index.html file into public folder."

cp -f ./websites/index.html ./public

