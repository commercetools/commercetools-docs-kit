#!/bin/sh
# watches the other repo for changes and triggers a full sync on any file change, delete, create etc.
# needs to be stopped with ctrl+c, this is an endless loop.

# prerequisite: Install watchman https://facebook.github.io/watchman/docs/install.html
# $ brew install watchman
while watchman-wait ../../../../../commercetools-importer/api-spec; do
    rsync -avhm --delete ../../../../../commercetools-importer/api-spec/ ./import
done
