#!/bin/sh
# watches the other repo for changes and triggers a full sync on any file change, delete, create etc.
# needs to be stopped with ctrl+c, this is an endless loop.
while inotifywait -r ../../../../../commercetools-importer/api-spec/*; do
    rsync -avhm --delete ../../../../../commercetools-importer/api-spec/ ./import
done
