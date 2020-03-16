/* eslint one-var: 0, import/no-extraneous-dependencies: 0, semi-style: 0 */

'use strict';

// -- Node modules
const { src, dest, series } = require('gulp')
    , fs      = require('fs')
    , del     = require('del')
    , replace = require('gulp-replace')
    ;


// -- Local modules
const config = require('./config')
    ;


// -- Local constants
const tmppriv      = './private_repo/tmp'
    , libname      = config.libname.replace(/\s+/g, '').toLowerCase()
    , { index }    = config
    , { distlink } = config
    ;


// -- Local variables


// -- Gulp Private Tasks

// Removes the previous version.
function clear(done) {
  del.sync(tmppriv);
  done();
}

// Copies the modified index.
function copyindex() {
  return src(index)
    .pipe(replace(`./lib/${libname}`, distlink))
    .pipe(dest(tmppriv))
  ;
}

// Copies the modified package.json
function copypackagejson(done) {
  fs.readFile('./package.json', 'utf8', (error, data) => {
    if (error) { throw error; }
    const obj = JSON.parse(data);
    obj.main = distlink;
    obj.bin = {};
    obj.scripts = {};
    obj.dependencies = {};
    obj.devDependencies = {};
    obj.private = true;
    obj.husky = {};

    // Write the updated package.json:
    fs.writeFile(`${tmppriv}/package.json`, JSON.stringify(obj, null, 2), 'utf8', (err) => {
      if (err) {
        throw err;
      }
      done();
    });
  });
}


// -- Gulp Public Task(s)

module.exports = series(clear, copyindex, copypackagejson);
