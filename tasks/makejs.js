/* eslint one-var: 0, import/no-extraneous-dependencies: 0, semi-style: 0,
  object-curly-newline: 0 */

'use strict';

// -- Vendor Modules
const fs = require('fs')
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


// -- Private Tasks

/**
 * Removes the previous version.
 */
function clean() {
  const d1 = new Date();
  process.stdout.write('Starting \'\x1b[36mclean\x1b[89m\x1b[0m\'...\n');


  fs.rmSync(destination, { force: true, recursive: true });
  fs.mkdirSync(destination, { recursive: true });

  const d2 = new Date() - d1;
  process.stdout.write(`Finished '\x1b[36mclean\x1b[89m\x1b[0m' after \x1b[35m${d2} ms\x1b[89m\x1b[0m\n`);
}


/**
 * Creates the content.
 */
function docore() {
  const d1 = new Date();
  process.stdout.write('Starting \'\x1b[36mdocore\x1b[89m\x1b[0m\'...\n');

  let src = '';
  for (let i = 0; i < core.length; i++) {
    src += fs.readFileSync(core[i]);
    if (i < core.length - 1) {
      src += '\n';
    }
  }

  src = src
    .replace(/{{lib:name}}/g, libname)
    .replace(/{{lib:version}}/g, version)
    // remove the extra global and 'use strict':
    .replace(/\/\* global[\w$_\s,]+\*\//g, '/* - */')
    .replace(/\n'use strict';\n/g, '')
    // indent the first line with 2 spaces:
    .replace(/^/g, '  ')
    // indent each other lines with 2 spaces:
    .replace(/\n/g, '\n  ')
  ;

  fs.writeFileSync(`${destination}/core.js`, src);
  const d2 = new Date() - d1;
  process.stdout.write(`Finished '\x1b[36mdocore\x1b[89m\x1b[0m' after \x1b[35m${d2} ms\x1b[89m\x1b[0m\n`);
}


/**
 * Create the UMD Module.
 */
function doumdlib() {
  const d1 = new Date();
  process.stdout.write('Starting \'\x1b[36mdoumdlib\x1b[89m\x1b[0m\'...\n');

  let src = '';
  src = fs.readFileSync(head);
  src += '\n';
  src += fs.readFileSync(`${destination}/core.js`);
  src += '\n';
  src += fs.readFileSync(foot);

  src = src
    .replace('{{lib:es6:define}}\n', '')
    .replace('{{lib:es6:link}}', 'this')
    .replace('{{lib:es6:export}}\n', '')
    // fix the blanck lines we indented too:
    .replace(/\s{2}\n/g, '\n')
  ;

  fs.writeFileSync(`${destination}/${name}.js`, src);
  const d2 = new Date() - d1;
  process.stdout.write(`Finished '\x1b[36mdoumdlib\x1b[89m\x1b[0m' after \x1b[35m${d2} ms\x1b[89m\x1b[0m\n`);
}


/**
 * Creates the ES6 module.
 */
function domodule() {
  const d1 = new Date();
  process.stdout.write('Starting \'\x1b[36mdomodule\x1b[89m\x1b[0m\'...\n');

  let exportM = '\n// -- Export\n';
  exportM += `export default ${ES6GLOB}.${libname};`;

  let src = '';
  src = fs.readFileSync(head);
  src += '\n';
  src += fs.readFileSync(`${destination}/core.js`);
  src += '\n';
  src += fs.readFileSync(foot);

  src = src
    .replace('{{lib:es6:define}}', `const ${ES6GLOB} = {};`)
    .replace('{{lib:es6:link}}', ES6GLOB)
    .replace('{{lib:es6:export}}', exportM)
    // fix the blanck lines we indented too:
    .replace(/\s{2}\n/g, '\n')
  ;

  fs.writeFileSync(`${destination}/${name}.mjs`, src);
  const d2 = new Date() - d1;
  process.stdout.write(`Finished '\x1b[36mdomodule\x1b[89m\x1b[0m' after \x1b[35m${d2} ms\x1b[89m\x1b[0m\n`);
}


/**
 * Removes the temp file(s).
 */
function delcore() {
  const d1 = new Date();
  process.stdout.write('Starting \'\x1b[36mdelcore\x1b[89m\x1b[0m\'...\n');
  fs.unlinkSync(`${destination}/core.js`);

  const d2 = new Date() - d1;
  process.stdout.write(`Finished '\x1b[36mdelcore\x1b[89m\x1b[0m' after \x1b[35m${d2} ms\x1b[89m\x1b[0m\n`);
}


// -- Public Task(s)
const d1 = new Date();
process.stdout.write('Starting \'\x1b[36mbuild:js:dev\x1b[89m\x1b[0m\'...\n');
clean();
docore();
doumdlib();
domodule();
delcore();

const d2 = new Date() - d1;
process.stdout.write(`Finished '\x1b[36mbuild:js:dev\x1b[89m\x1b[0m' after \x1b[35m${d2} ms\x1b[89m\x1b[0m\n`);


// -- oOo --
