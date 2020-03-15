/* eslint one-var: 0, semi-style: 0 */

'use strict';

// -- Node modules
const { watch, series } = require('gulp')
    , connect = require('gulp-connect')
    , open    = require('open')
    ;

// -- Local constants
const filesToWatch = ['src/**/*.js', 'src/_header', 'src/_footer']
    ;

// -- Local variables

// -- Gulp Private Tasks
const build       = require('./tasks/makejs')
    , makedist    = require('./tasks/makedist')
    , makeprivate = require('./tasks/makeprivatepackage')
    ;


// -- Gulp watch
function fwatch() {
  watch(filesToWatch, series(build));
}

// -- Gulp connect dev
function devserver(done) {
  connect.server({
    host: '0.0.0.0', // (allows remote access)
    root: './',
    port: 8888,
    livereload: true,
  });
  open('http://localhost:8888/');
  done();
}

// -- Gulp connect prod
function appserver(done) {
  connect.server({
    host: '0.0.0.0', // (allows remote access)
    root: './_dist',
    port: 8889,
    livereload: true,
  });
  open('http://localhost:8889/');
  done();
}


// Gulp Public Tasks:
exports.watch = fwatch;
exports.build = build;
exports.rundev = devserver;
exports.makedist = makedist;
exports.runapp = appserver;
exports.makeprivate = makeprivate;
exports.default = series(build, makedist, makeprivate);
