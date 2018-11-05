import path from 'path';
import json from 'rollup-plugin-json';
import flow from 'rollup-plugin-flow';
import babel from 'rollup-plugin-babel';
import commonjs from 'rollup-plugin-commonjs';
import resolve from 'rollup-plugin-node-resolve';
import shim from 'rollup-plugin-shim';
import { uglify } from 'rollup-plugin-uglify';

const env = process.env.NODE_ENV;
const isCLI = process.argv[process.argv.length - 1] === 'bin/blinktrade';
const format = (env === 'development' || env === 'production') ? 'umd' : env;

const config = {
  input: isCLI ? 'bin/blinktrade.js' : 'src/index.js',
  output: {
    name: 'blinktrade',
    format,
  },
  plugins: [
    json({ preferConst: true }),
    flow({ all: true }),
    resolve({
      jsnext: true,
      browser: format === 'umd',
      preferBuiltins: false,
    }),
    commonjs({
      include: 'node_modules/**',
    }),
    babel({
      babelrc: false,
      presets: [['@babel/preset-env', { modules: false }]],
      plugins: ['@babel/plugin-proposal-object-rest-spread'],
    }),
  ],
};

if (format === 'umd') {
  config.plugins.push(uglify({
    mangle: env === 'production',
    output: {
      beautify: env !== 'production',
    },
    compress: {
      pure_getters: true,
      unsafe: true,
      unsafe_comps: true,
      warnings: false,
    },
  }));
  // Remove modules that can't be bundled on the browser
  config.plugins.unshift(shim({
    ws: 'export default {}',
    ip: 'export default {}',
    dgram: 'export default {}',
    os: 'export default {}',
    'macaddress-secure': 'export default {}',
    [path.join(__dirname, 'src/util/macaddress')]: 'export function getMac() {}',
    [path.join(__dirname, 'src/util/stun')]: `
      export function getStun() {}
      export function closeStun() {}
    `,
  }));
} else {
  config.external = ['ws', 'commander', 'inquirer', 'dotenv', '../lib/blinktrade'];
}

export default config;
