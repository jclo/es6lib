/** ************************************************************************
 *
 * Configuration file.
 *
 *
 *
 * @namespace    -
 * @dependencies none
 * @exports      -
 * @author       -
 * @since        0.0.0
 * @version      -
 * ********************************************************************** */
/* eslint one-var: 0, semi-style: 0 */

'use strict';

// -- Vendor Modules


// -- Local Modules
const pack = require('../package.json');


// -- Local Constants
const libname = 'ES6lib'
    , name    = libname.replace(/\s+/g, '').toLowerCase()
    ;


// -- Local Variables


// -- Main

module.exports = {
  ES6GLOB: '$__ES6GLOB',
  dist: './_dist',
  libdir: './lib',
  libname,
  name,
  index: './index.js',
  distlink: `./_dist/lib/${name}.js`,

  // These are the Javascript files required to build the library. Choose one
  // pattern among these ones. The library can include only the header file,
  // a core file and the footer file. The files 'basic.js', 'functional.js',
  // 'functional-shared.js', 'prototypal.js', 'pseudoclassical.js' and
  // 'pseudoclassical-auto.js' are mutually exclusives.
  /* eslint-disable no-multi-spaces */
  src: [
    // These three files (_header, _head.js and extend.js) must be declared
    // in this order as they create the umd module, define the global
    // constants/variables, the object tree and the function to fill
    // the tree!
    './src/_header',
    './src/_head.js',
    './src/lib/extend.js',

    './src/util/util.js',
    // './src/basic.js',
    // './src/basicplus.js',
    // './src/functional.js',
    // './src/functional-shared.js',
    './src/prototypal.js',
    // './src/pseudoclassical.js',
    // './src/pseudoclassical-auto.js',

    // This file must always be the last one as it closes the umd module.
    './src/_footer',
  ],
  /* eslint-enable no-multi-spaces */

  webfiles: [
    // These are the files to copy to the root path of the web app,
    './README.md',
    './LICENSE.md',
  ],

  get license() {
    return ['/*! ****************************************************************************',
      ` * ${libname} v${pack.version}`,
      ' *',
      ` * ${pack.description}.`,
      ' * (you can download it from npm or github repositories)',
      ` * Copyright (c) ${(new Date()).getFullYear()} ${pack.author.name} <${pack.author.email}> (${pack.author.url}).`,
      ' * Released under the MIT license. You may obtain a copy of the License',
      ' * at: http://www.opensource.org/licenses/mit-license.php).',
      ' * Built from {{boiler:name}} v{{boiler:name:version}}.',
      ' * ************************************************************************** */',
      ''].join('\n');
  },
};
