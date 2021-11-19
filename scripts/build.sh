#!/usr/bin/env bash

set -e

echo "Preparing production builds."

yarn build-packages
yarn generate-icons

echo "Building Gatsby websites."

cross-env NODE_ENV=production yarn workspaces foreach --include '@commercetools-website/*' run build

echo "Copying test index.html file into public folder."
cp -f ./websites/index.html ./public

echo "Running link checker"
yarn check-links
