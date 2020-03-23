// Do this as the first thing so that any code reading it knows the right env.
process.env.BUILD_ROLLUP = true;

const fs = require('fs');
const babel = require('rollup-plugin-babel');
const readPkgUp = require('read-pkg-up');
const resolve = require('@rollup/plugin-node-resolve');
// eslint-disable-next-line import/no-unresolved
const json = require('@rollup/plugin-json');
const commonjs = require('rollup-plugin-commonjs');
const peerDeps = require('rollup-plugin-peer-deps-external');
const builtins = require('rollup-plugin-node-builtins');
const svgr = require('@svgr/rollup').default;

const { packageJson: pkg } = readPkgUp.sync({
  cwd: fs.realpathSync(process.cwd()),
});
const [, packageName] = pkg.name.split('@commercetools-docs/');
const extensions = ['.js', '.ts', '.tsx'];

const plugins = [
  peerDeps({
    includeDependencies: true,
  }),
  babel({
    extensions,
    runtimeHelpers: true,
    rootMode: 'upward',
  }),
  // To convert CJS modules to ES6
  commonjs({
    include: 'node_modules/**',
  }),
  resolve({
    extensions,
    mainFields: ['module', 'main', 'jsnext'],
    preferBuiltins: true,
    modulesOnly: true,
  }),
  json({ namedExports: false }),
  builtins(),
  svgr({
    // NOTE: disable this and manually add `removeViewBox: false` in the SVGO plugins list
    // See related PR: https://github.com/smooth-code/svgr/pull/137
    icon: false,
    svgoConfig: {
      plugins: [{ removeViewBox: false }, { cleanupIDs: true }],
    },
  }),
];

const createConfig = (cliArgs) => [
  // Bundle for cjs format
  {
    input: cliArgs.input,
    output: {
      format: 'cjs',
      file: `dist/${packageName}.cjs.js`,
      sourcemap: true,
    },
    plugins,
  },
  // Bundle for es format
  {
    input: cliArgs.input,
    output: {
      format: 'es',
      file: `dist/${packageName}.es.js`,
      sourcemap: true,
    },
    plugins,
  },
];

module.exports = createConfig;
