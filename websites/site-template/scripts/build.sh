#!/usr/bin/env bash

set -e

echo "Preparing production build for @commercetools-website/site-template."

yarn clean

echo "Building Gatsby website @commercetools-website/site-template."

yarn gatsby build --prefix-paths


echo "Copying public folder of @commercetools-website/site-template into root public folder."

rm -rf ../../public/site-template
mkdir -p ../../public
mv public ../../public/site-template
