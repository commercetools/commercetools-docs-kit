#!/usr/bin/env bash

set -e

echo "Preparing production build for @commercetools-website/docs-smoke-test."

yarn clean

echo "Building Gatsby website @commercetools-website/docs-smoke-test."

yarn gatsby build --prefix-paths

echo "Copying public folder of @commercetools-website/docs-smoke-test into root public folder."

rm -rf ../../public/docs-smoke-test
mkdir -p ../../public
mv public ../../public/docs-smoke-test
