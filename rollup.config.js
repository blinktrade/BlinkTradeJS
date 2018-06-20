import json from 'rollup-plugin-json';
import flow from 'rollup-plugin-flow';
import babel from 'rollup-plugin-babel';
import uglify from 'rollup-plugin-uglify';
import commonjs from 'rollup-plugin-commonjs';
import resolve from 'rollup-plugin-node-resolve';
import shim from 'rollup-plugin-shim';

const env = process.env.NODE_ENV;
const format = (env === 'development' || env === 'production') ? 'umd' : env;

const config = {
  input: 'src/index.js',
  output: {
    name: 'blinktrade',
    format,
  },
  plugins: [
    json({
      include: 'node_modules/**',
      preferConst: true,
    }),
    flow({ all: true }),
    babel({
      babelrc: false,
      plugins: [
        'transform-object-rest-spread',
        'external-helpers',
      ],
    }),
    resolve({
      jsnext: true,
      browser: format === 'umd',
      preferBuiltins: false,
    }),
    commonjs({
      include: 'node_modules/**',
    }),
    uglify({
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
    }),
  ],
};

if (format === 'umd') {
  // Remove modules that are not used on the browser
  config.plugins.unshift(shim({
    ws: 'export default () => {}',
    ip: 'export default () => {}',
    dgram: 'export default () => {}',
    os: 'export default {}',
    'macaddress-secure': 'export default {}',
  }));
} else {
  config.external = ['ws'];
}

export default config;
