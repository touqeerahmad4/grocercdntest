#!/usr/bin/env bash
# ... build the app ... #
echo "Building the repo"
export REACT_APP_COMMIT_REF=${COMMIT_REF::7}
node scripts/build.js && cp ./_redirects build/ && cp ./_headers build/  
set -o allexport
[[ -f .env ]] && source .env
set +o allexport

# install sentry cli
echo "Installing and configuring sentry cli"
npm install -g @sentry/cli --unsafe-perm
sentry-cli --version
export SENTRY_ORG=grocerapp-bn
export SENTRY_PROJECT=grocerapp-pk
export SENTRY_AUTH_TOKEN=35e43d270cdd406cadc773d25af3412918d303239ef7462b8fa4d605e1d1ae29


# create sentry release and upload source maps
echo "Creating release"
sentry-cli releases -o ${SENTRY_ORG} new -p ${SENTRY_PROJECT} ${COMMIT_REF::7}
echo "Setting release commits"
sentry-cli releases set-commits --commit "GrocerApp/web-customer-app@$COMMIT_REF" ${COMMIT_REF::7}
echo "Link deploy to release"
sentry-cli releases deploys ${COMMIT_REF::7} new -e ${REACT_APP_SENTRY_ENV}
echo "Uploading source maps"
sentry-cli releases files ${COMMIT_REF::7} upload-sourcemaps build/static/js/ --rewrite --url-prefix '~/static/js'
echo "Finalizing release"
sentry-cli releases finalize ${COMMIT_REF::7}

# ... delete source maps ... #