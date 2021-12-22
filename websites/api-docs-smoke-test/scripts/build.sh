#!/usr/bin/env bash

set -e

echo "Preparing production build for @commercetools-website/api-docs-smoke-test."

yarn generate-ramldoc

echo "Building Gatsby website @commercetools-website/api-docs-smoke-test."

yarn gatsby build --prefix-paths --verbose --log-pages
