/* eslint  one-var: 0, import/no-extraneous-dependencies: 0, semi-style: 0 */

'use strict';

// -- Node modules
const { src, dest, series } = require('gulp')
    , del     = require('del')
    , concat  = require('gulp-concat')
    , replace = require('gulp-replace')
    ;


// -- Local modules
const config = require('./config')
   ;


// -- Local constants
const destination  = config.libdir
    , source       = config.src
    , lib          = config.libname
    , name         = lib.replace(/\s+/g, '').toLowerCase()
    , { parent }   = config
    , { noparent } = config
    , head         = source[0]
    , core         = source.slice(1, -1)
    , foot         = source[source.length - 1]
    ;


// -- Local variables


// -- Gulp Private Tasks

// Removes the previous version.
function clean(done) {
  del.sync(destination);
  done();
}

// Creates the indented content.
function docore() {
  return src(core)
    // remove the extra 'use strict':
    .pipe(replace(/\n'use strict';\n/, ''))
    // indent the first line with 2 spaces:
    .pipe(replace(/^/g, '  '))
    // indent each other lines with 2 spaces:
    .pipe(replace(/\n/g, '\n  '))
    .pipe(concat('core.js'))
    .pipe(dest(destination));
}

// Creates the library without 'this'.
function dolibnoparent() {
  return src([head, `${destination}/core.js`, foot])
    .pipe(replace('{{lib:name}}', lib))
    .pipe(concat(`${name}${noparent}.js`))
    // fix the blanck lines we indented too:
    .pipe(replace(/\s{2}\n/g, '\n'))
    .pipe(dest(destination));
}

// Creates the library.
function dolib() {
  return src(`${destination}/${name}${noparent}.js`)
    .pipe(replace('{{lib:parent}}', parent))
    .pipe(concat(`${name}.js`))
    .pipe(dest(destination));
}

// Removes the temp file(s).
function delcore(done) {
  del.sync(`${destination}/core.js`);
  done();
}


// -- Gulp Public Task(s)
module.exports = series(clean, docore, dolibnoparent, dolib, delcore);
