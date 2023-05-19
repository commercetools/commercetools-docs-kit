#!/usr/bin/env bash

set -e

echo "Building Gatsby website @commercetools-website/self-learning-smoke-test."

yarn gatsby build --prefix-paths --verbose --log-pages
