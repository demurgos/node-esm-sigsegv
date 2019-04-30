# Node ESM sigsegv

This repository reproduces a segfault with Node's ESM support.

```
System: Linux 5.0.8 64-bit
Node: 12.1.0
```

Install the dependencies with `npm` or `yarn` (lock files are provided) and execute the following command (or `run.sh`):

```
node --experimental-modules --es-module-specifier-resolution=node node_modules/mocha/bin/_mocha build/test/test.esm.js --delay --async --no-config --no-package --no-opts --diff --extension js --reporter spec --slow 75 --timeout 2000 --ui bdd
```

It has a very high probability of causing a segfault (all the time during my tests, read forward why this is not deterministic).

Here is a log of my console:
```
/data/projects/web/node-esm-sigsegv $ ./run.sh 
+ node --experimental-modules --es-module-specifier-resolution=node node_modules/mocha/bin/_mocha build/test/test.esm.js --delay --async --no-config --no-package --no-opts --diff --extension js --reporter spec --slow 75 --timeout 2000 --ui bdd
(node:11259) ExperimentalWarning: The ESM module loader is experimental.
./run.sh: line 4: 11259 Segmentation fault      (core dumped) node --experimental-modules --es-module-specifier-resolution=node node_modules/mocha/bin/_mocha build/test/test.esm.js --delay --async --no-config --no-package --no-opts --diff --extension js --reporter spec --slow 75 --timeout 2000 --ui bdd

/data/projects/web/node-esm-sigsegv $ ./run.sh 
+ node --experimental-modules --es-module-specifier-resolution=node node_modules/mocha/bin/_mocha build/test/test.esm.js --delay --async --no-config --no-package --no-opts --diff --extension js --reporter spec --slow 75 --timeout 2000 --ui bdd
(node:11279) ExperimentalWarning: The ESM module loader is experimental.
./run.sh: line 4: 11279 Segmentation fault      (core dumped) node --experimental-modules --es-module-specifier-resolution=node node_modules/mocha/bin/_mocha build/test/test.esm.js --delay --async --no-config --no-package --no-opts --diff --extension js --reporter spec --slow 75 --timeout 2000 --ui bdd

/data/projects/web/node-esm-sigsegv $ ./run.sh 
+ node --experimental-modules --es-module-specifier-resolution=node node_modules/mocha/bin/_mocha build/test/test.esm.js --delay --async --no-config --no-package --no-opts --diff --extension js --reporter spec --slow 75 --timeout 2000 --ui bdd
(node:11300) ExperimentalWarning: The ESM module loader is experimental.
./run.sh: line 4: 11300 Segmentation fault      (core dumped) node --experimental-modules --es-module-specifier-resolution=node node_modules/mocha/bin/_mocha build/test/test.esm.js --delay --async --no-config --no-package --no-opts --diff --extension js --reporter spec --slow 75 --timeout 2000 --ui bdd

/data/projects/web/node-esm-sigsegv $ ./run.sh 
+ node --experimental-modules --es-module-specifier-resolution=node node_modules/mocha/bin/_mocha build/test/test.esm.js --delay --async --no-config --no-package --no-opts --diff --extension js --reporter spec --slow 75 --timeout 2000 --ui bdd
(node:11321) ExperimentalWarning: The ESM module loader is experimental.
./run.sh: line 4: 11321 Segmentation fault      (core dumped) node --experimental-modules --es-module-specifier-resolution=node node_modules/mocha/bin/_mocha build/test/test.esm.js --delay --async --no-config --no-package --no-opts --diff --extension js --reporter spec --slow 75 --timeout 2000 --ui bdd
```

This command ultimately imports [`build/test/test.esm.js`](./build/test/test.esm.js) which in turn sequentially imports the `.spec.mjs` files from the `test/test` directory.
The more files are imported, the higher the chance of segfault.

If I comment out all the dynamic imports but one, the command seems to never crash:
```
(async () => {
  await import("./test/types/white-list.spec.mjs");
  run();
})();
```

If I use 2 or 3 dynamic imports, I get a segfault about 25% of the time.
That's why I think that the behavior is non-deterministic.

If I use 4 or more dynamic imports, it always crashes.

[Issue: nodejs/node#27492](https://github.com/nodejs/node/issues/27492)
