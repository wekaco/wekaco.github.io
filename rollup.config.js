import riot from 'rollup-plugin-riot';
import nodeResolve from 'rollup-plugin-node-resolve';

import builtins from 'rollup-plugin-node-builtins';
import globals from 'rollup-plugin-node-globals';

import commonjs from 'rollup-plugin-commonjs';

import { terser } from 'rollup-plugin-terser';

export default {
  input: 'js/player.js',
  output: [
    {
      file: 'dist/player.js',
      format: 'iife',
      sourcemap: 'inline'
    },
    {
      file: 'dist/player.min.js',
      format: 'iife'
    },
  ],
  plugins: [
    riot({
      ext: 'riot'
    }),
    builtins(),
    globals(),
    nodeResolve(),
    commonjs(),
    terser({
      include:  [/^.+\.min\.js$/]
    })
  ]
}
