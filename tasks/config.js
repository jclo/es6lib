/* eslint one-var: 0, semi-style: 0 */

'use strict';

// -- Vendor modules


// -- Local modules
const pack = require('../package.json');


// -- Local constants
const libname = 'ES6lib'
    , name    = libname.replace(/\s+/g, '').toLowerCase()
    ;


// -- Local variables


// -- Main

module.exports = {
  dist: './_dist',
  libdir: './lib',
  libname,
  parent: 'this',
  noparent: '-noparent',
  index: './index.js',
  distlink: `./_dist/lib/${name}.js`,
  // These are the Javascript files required to build the library. Choose one
  // pattern among these ones. The library can include only the header file,
  // a core file and the footer file. The files 'basic.js', 'functional.js',
  // 'functional-shared.js', 'prototypal.js', 'pseudoclassical.js' and
  // 'pseudoclassical-auto.js' are mutually exclusives.
  /* eslint-disable no-multi-spaces */
  src: [
    // These three files (_header, tree.js and extend.js) must be declared in
    // this order as they create the umd module, define the object tree and
    // the function to fill the tree!
    './src/_header',
    './src/tree.js',
    './src/lib/extend.js',

    './src/util/util.js',
    // './src/basic.js',
    // './src/basicplus.js',
    // './src/functional.js',
    './src/functional-shared.js',
    // './src/prototypal.js',
    // './src/pseudoclassical.js',
    // './src/pseudoclassical-auto.js',

    // This file must always be the last one as it closes the umd module.
    './src/_footer',
  ],
  /* eslint-enable no-multi-spaces */
  /* eslint-enable no-multi-spaces */
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
