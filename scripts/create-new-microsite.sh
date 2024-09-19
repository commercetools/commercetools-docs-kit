#!/usr/bin/env bash

set -e

echo "Starting the process."

yarn node ./scripts/create-new-microsite.js

echo "New microsite created."
echo "Installing dependencies."

yarn

echo "Process complete."
Purple='\033[0;35m'
echo -e "${Purple}Please add the new microsite to the build.sh script in the root folder to enable production builds."