/* eslint one-var: 0, import/no-extraneous-dependencies: 0, semi-style: 0,
  object-curly-newline: 0 */

'use strict';

// -- Vendor Modules
const { src, dest, series, parallel } = require('gulp')
    , del     = require('del')
    , concat  = require('gulp-concat')
    , header  = require('gulp-header')
    , replace = require('gulp-replace')
    , uglify  = require('gulp-uglify-es').default
    ;


// -- Local Modules
const config = require('./config')
    ;


// -- Local Constants
const { dist }     = config
    , { libdir }   = config
    , { name }     = config
    , { noparent } = config
    , { license }  = config
    ;


// -- Local Variables


// -- Gulp Private Tasks

// Removes the previous dist.
function deldist(done) {
  del.sync(dist);
  done();
}

// Copies README and LICENSE.
function doskeleton() {
  return src(['README.md', 'LICENSE.md'])
    .pipe(dest(dist));
}

// Copies the development version.
function copydev() {
  return src(`${libdir}/${name}.js`)
    .pipe(replace(/}\(this, \(root\) => {/, '}(this, (root) => /* istanbul ignore next */ {'))
    .pipe(header(license))
    .pipe(dest(`${dist}/lib`));
}

// Copies the development version without parent.
function makenoparentlib() {
  return src(`${libdir}/${name}${noparent}.js`)
    .pipe(replace(/}\({{lib:parent}}, \(root\) => {/, '}({{lib:parent}}, (root) => /* istanbul ignore next */ {'))
    .pipe(header(license))
    .pipe(replace(/ {2}'use strict';\n\n/g, ''))
    .pipe(dest(`${dist}/lib`));
}

// Creates the minified version.
function makeminified() {
  return src(`${libdir}/${name}.js`)
    .pipe(replace('/*! ***', '/** ***'))
    .pipe(uglify())
    .pipe(header(license))
    .pipe(concat(`${name}.min.js`))
    .pipe(dest(`${dist}/lib`));
}


// -- Gulp Public Task(s):

module.exports = series(
  deldist,
  parallel(doskeleton, copydev, makenoparentlib, makeminified),
);
