#!/usr/bin/env bash
set -ex

node --experimental-modules --es-module-specifier-resolution=node node_modules/mocha/bin/_mocha build/test/test.esm.js --delay --async --no-config --no-package --no-opts --diff --extension js --reporter spec --slow 75 --timeout 2000 --ui bdd
