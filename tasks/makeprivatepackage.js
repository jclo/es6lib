/* eslint one-var: 0, import/no-extraneous-dependencies: 0, semi-style: 0 */

'use strict';

// -- Node modules
const { src, dest, parallel } = require('gulp')
    , fs = require('fs')
    ;


// -- Local modules
const config = require('./config')
    ;


// -- Release version:


// -- Local constants
const { dist } = config
    , { index } = config
    ;


// -- Local variables


// -- Gulp Private Tasks

function copypackagejson(done) {
  fs.readFile('./package.json', 'utf8', (error, data) => {
    if (error) { throw error; }
    const obj = JSON.parse(data);
    obj.bin = {};
    obj.scripts = {};
    obj.dependencies = {};
    obj.devDependencies = {};
    obj.private = true;
    obj.husky = {};

    // Write the updated package.json:
    fs.writeFile(`${dist}/package.json`, JSON.stringify(obj, null, 2), 'utf8', (err) => {
      if (err) {
        throw err;
      }
      done();
    });
  });
}

// Copies the index.
function copyindex() {
  return src(index)
    .pipe(dest(dist))
  ;
}


// -- Gulp Public Task(s)

module.exports = parallel(copypackagejson, copyindex);
