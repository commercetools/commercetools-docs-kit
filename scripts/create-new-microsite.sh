#!/usr/bin/env bash

set -e

echo "Starting the process."

yarn node ./scripts/create-new-microsite.js

echo "New microsite created."
echo "Installing dependencies."

yarn

echo "Process complete."