#!/usr/bin/env bash

set -e

echo "Building Gatsby website @commercetools-website/site-template."

yarn gatsby build --prefix-paths --verbose --log-pages
