/* eslint one-var: 0, import/no-extraneous-dependencies: 0, semi-style: 0,
  object-curly-newline: 0 */

'use strict';

// -- Vendor Modules
const { src, dest, series, parallel } = require('gulp')
    , del     = require('del')
    , concat  = require('gulp-concat')
    , replace = require('gulp-replace')
    ;


// -- Local Modules
const pack   = require('../package.json')
    , config = require('./config')
    ;


// -- Local Constants
const destination = config.libdir
    , { ES6GLOB } = config
    , source      = config.src
    , { libname } = config
    , { name }    = config
    , head        = source[0]
    , core        = source.slice(1, -1)
    , foot        = source[source.length - 1]
    , { version } = pack
    ;


// -- Local Variables


// -- Gulp Private Tasks

// Removes the previous version.
function clean(done) {
  del.sync(destination);
  done();
}

// Creates the content.
function docore() {
  return src(core)
    .pipe(replace('{{lib:name}}', libname))
    .pipe(replace('{{lib:version}}', version))
    // remove the extra global and 'use strict':
    .pipe(replace(/\/\* global[\w$_\s,]+\*\//g, '/* - */'))
    .pipe(replace(/\n'use strict';\n/, ''))
    // indent the first line with 2 spaces:
    .pipe(replace(/^/g, '  '))
    // indent each other lines with 2 spaces:
    .pipe(replace(/\n/g, '\n  '))
    .pipe(concat('core.js'))
    .pipe(dest(destination))
  ;
}

// Create the UMD Module.
function doumdlib() {
  return src([head, `${destination}/core.js`, foot])
    .pipe(replace('{{lib:es6:define}}\n', ''))
    .pipe(replace('{{lib:es6:link}}', 'this'))
    .pipe(replace('{{lib:es6:export}}\n', ''))
    .pipe(concat(`${name}.js`))
    // fix the blanck lines we indented too:
    .pipe(replace(/\s{2}\n/g, '\n'))
    .pipe(dest(destination))
  ;
}

// Creates the ES6 module.
function domodule() {
  let exportM = '\n// -- Export\n';
  exportM += `export default ${ES6GLOB}.${libname};`;

  return src([head, `${destination}/core.js`, foot])
    .pipe(replace('{{lib:es6:define}}', `const ${ES6GLOB} = {};`))
    .pipe(replace('{{lib:es6:link}}', ES6GLOB))
    .pipe(replace('{{lib:es6:export}}', exportM))
    .pipe(concat(`${name}.mjs`))
    // fix the blanck lines we indented too:
    .pipe(replace(/\s{2}\n/g, '\n'))
    .pipe(dest(destination))
  ;
}

// Removes the temp file(s).
function delcore(done) {
  del.sync(`${destination}/core.js`);
  done();
}


// -- Gulp Public Task(s)
module.exports = series(
  clean,
  docore,
  parallel(doumdlib, domodule),
  delcore,
);
