/* eslint one-var: 0, import/no-extraneous-dependencies: 0, semi-style: 0,
  object-curly-newline: 0 */

'use strict';

// -- Vendor Modules
const fs         = require('fs')
    , path       = require('path')
    , { minify } = require('terser')
    ;


// -- Local Modules
const config = require('./config')
    ;


// -- Local Constants
const { dist }     = config
    , { webfiles } = config
    , { libdir }   = config
    , { name }     = config
    , { license }  = config
    ;


// -- Local Variables


// -- Private Tasks

/**
 * Removes the previous version.
 */
function deldist() {
  const d1 = new Date();
  process.stdout.write('Starting \'\x1b[36mdeldist\x1b[89m\x1b[0m\'...\n');


  fs.rmSync(dist, { force: true, recursive: true });
  fs.mkdirSync(`${dist}/lib`, { recursive: true });

  const d2 = new Date() - d1;
  process.stdout.write(`Finished '\x1b[36mdeldist\x1b[89m\x1b[0m' after \x1b[35m${d2} ms\x1b[89m\x1b[0m\n`);
}


/**
 * Copies README and LICENSE.
 */
function doskeleton() {
  const d1 = new Date();
  process.stdout.write('Starting \'\x1b[36mdoskeleton\x1b[89m\x1b[0m\'...\n');

  let filename;
  for (let i = 0; i < webfiles.length; i++) {
    filename = path.basename(webfiles[i]);
    fs.copyFileSync(webfiles[i], `${dist}/${filename}`);
  }


  const d2 = new Date() - d1;
  process.stdout.write(`Finished '\x1b[36mdoskeleton\x1b[89m\x1b[0m' after \x1b[35m${d2} ms\x1b[89m\x1b[0m\n`);
}


/**
 * Copies the development version.
 */
function copydev() {
  const d1 = new Date();
  process.stdout.write('Starting \'\x1b[36mcopydev\x1b[89m\x1b[0m\'...\n');

  let f = license;
  f += fs.readFileSync(`${libdir}/${name}.js`, 'utf-8');
  fs.writeFileSync(`${dist}/lib/${name}.js`, f);

  const d2 = new Date() - d1;
  process.stdout.write(`Finished '\x1b[36mcopydev\x1b[89m\x1b[0m' after \x1b[35m${d2} ms\x1b[89m\x1b[0m\n`);
}


/**
 * Copies the module development version.
 */
function copydevm() {
  const d1 = new Date();
  process.stdout.write('Starting \'\x1b[36mcopydevm\x1b[89m\x1b[0m\'...\n');

  let f = license;
  f += fs.readFileSync(`${libdir}/${name}.mjs`, 'utf-8');
  fs.writeFileSync(`${dist}/lib/${name}.mjs`, f);

  const d2 = new Date() - d1;
  process.stdout.write(`Finished '\x1b[36mcopydevm\x1b[89m\x1b[0m' after \x1b[35m${d2} ms\x1b[89m\x1b[0m\n`);
}


/**
 * Creates the minified version.
 */
function makeminified() {
  const d1 = new Date();
  process.stdout.write('Starting \'\x1b[36mmakeminified\x1b[89m\x1b[0m\'...\n');

  let f;
  f = fs.readFileSync(`${libdir}/${name}.js`, 'utf-8');
  f = f.replace(/\/\*! \*\*\*/g, '/** ***');
  minify(f, { compress: false, mangle: true })
    .then((result) => {
      fs.writeFileSync(`${dist}/lib/${name}.min.js`, `${license}!${result.code}`);

      const d2 = new Date() - d1;
      process.stdout.write(`Finished '\x1b[36mmakeminified\x1b[89m\x1b[0m' after \x1b[35m${d2} ms\x1b[89m\x1b[0m\n`);
    });
}


/**
 * Creates the module minified version.
 */
function makeminifiedm() {
  const d1 = new Date();
  process.stdout.write('Starting \'\x1b[36mmakeminifiedm\x1b[89m\x1b[0m\'...\n');

  let f;
  f = fs.readFileSync(`${libdir}/${name}.mjs`, 'utf-8');
  f = f.replace(/\/\*! \*\*\*/g, '/** ***');
  minify(f, { compress: false, mangle: true })
    .then((result) => {
      fs.writeFileSync(`${dist}/lib/${name}.min.mjs`, `${license}!${result.code}`);

      const d2 = new Date() - d1;
      process.stdout.write(`Finished '\x1b[36mmakeminifiedm\x1b[89m\x1b[0m' after \x1b[35m${d2} ms\x1b[89m\x1b[0m\n`);
    });
}


// -- Public Task(s):

const d1 = new Date();
process.stdout.write('Starting \'\x1b[36mbuild:js:prod\x1b[89m\x1b[0m\'...\n');
deldist();
doskeleton();
copydev();
copydevm();
makeminified();
makeminifiedm();

const d2 = new Date() - d1;
process.stdout.write(`Finished '\x1b[36mbuild:js:prod\x1b[89m\x1b[0m' after \x1b[35m${d2} ms\x1b[89m\x1b[0m\n`);


// -- oOo --
