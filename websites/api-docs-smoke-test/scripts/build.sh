#!/usr/bin/env bash

set -e

echo "Preparing production build for @commercetools-website/api-docs-smoke-test."

yarn clean
yarn generate-ramldoc

echo "Building Gatsby website @commercetools-website/api-docs-smoke-test."

yarn gatsby build --prefix-paths


echo "Copying public folder of @commercetools-website/api-docs-smoke-test into root public folder."

rm -rf ../../public/api-docs-smoke-test
mkdir -p ../../public
mv public ../../public/api-docs-smoke-test
