/* eslint one-var: 0, semi-style: 0 */

'use strict';

// -- Node modules
const { watch, series } = require('gulp')
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


// Gulp Public Tasks:
exports.watch = fwatch;
exports.build = build;
exports.makedist = makedist;
exports.makeprivate = makeprivate;
exports.default = series(build, makedist, makeprivate);
