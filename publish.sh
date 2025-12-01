#!/bin/bash

set -e  # Exit on error

echo "Building all library packages..."
npm run build:lib

echo ""
echo "Publishing packages to npm..."
npm publish ./dist/ng-dynamic-forms/core/ --access public
npm publish ./dist/ng-dynamic-forms/ui-basic/ --access public
npm publish ./dist/ng-dynamic-forms/ui-bootstrap/ --access public
npm publish ./dist/ng-dynamic-forms/ui-foundation/ --access public
npm publish ./dist/ng-dynamic-forms/ui-ionic/ --access public
npm publish ./dist/ng-dynamic-forms/ui-material/ --access public
npm publish ./dist/ng-dynamic-forms/ui-ng-bootstrap/ --access public
npm publish ./dist/ng-dynamic-forms/ui-ngx-bootstrap/ --access public
npm publish ./dist/ng-dynamic-forms/ui-primeng/ --access public

echo ""
echo "✅ All packages published successfully!"
