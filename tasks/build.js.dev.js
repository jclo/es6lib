#!/usr/bin/env node
/* *****************************************************************************
 *
 * Creates the JS bundle.
 *
 * build:js.dev script creates the JS bundle from ./public/src/main.js by importing
 * all the linked src files;
 *
 * Private Functions:
 *  . _help                       displays the help message,
 *  . _clean                      removes the previous build,
 *  . _docore                     creates the content of the library,
 *  . _doumdlib                   creates the UMD Module,
 *  . _domodule                   creates the ES6 module,
 *  . _delcore                    removes the temp file(s),
 *
 *
 * Public Static Methods:
 *  . run                         executes the script,
 *
 *
 * @namespace    -
 * @dependencies none
 * @exports      -
 * @author       -
 * @since        0.0.0
 * @version      -
 * ************************************************************************** */
/* eslint one-var: 0, semi-style: 0, no-underscore-dangle: 0 */

'use strict';

// -- Vendor Modules
const fs   = require('fs')
    , nopt = require('nopt')
    ;


// -- Local Modules
const pack   = require('../package.json')
    , config = require('./config')
    ;


// -- Local Constants
const VERSION     = '0.0.0-alpha.0'
    , opts        = {
      help: [Boolean, false],
      version: [String, null],
    }
    , shortOpts   = {
      h: ['--help'],
      v: ['--version', VERSION],
    }
    , parsed      = nopt(opts, shortOpts, process.argv, 2)
    , destination = config.libdir
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


// -- Private Functions --------------------------------------------------------

/**
 * Dispays the help message.
 *
 * @function ()
 * @private
 * @param {}                -,
 * @returns {}              -,
 * @since 0.0.0
 */
function _help() {
  const message = ['',
    'Usage: command [options]',
    '',
    '                       creates the js bundle from ./public/src/main.js',
    '',
    'Options:',
    '',
    '-h, --help             output usage information',
    '-v, --version          output the version number',
    '',
  ].join('\n');

  process.stdout.write(`${message}\n`);
}

/**
 * Removes the previous build.
 *
 * @function ()
 * @private
 * @param {}                -,
 * @returns {}              -,
 * @since 0.0.0
 */
function _clean() {
  const d1 = new Date();
  process.stdout.write('Starting \'\x1b[36mclean\x1b[89m\x1b[0m\'...\n');

  fs.rmSync(destination, { force: true, recursive: true });
  fs.mkdirSync(destination, { recursive: true });

  const d2 = new Date() - d1;
  process.stdout.write(`Finished '\x1b[36mclean\x1b[89m\x1b[0m' after \x1b[35m${d2} ms\x1b[89m\x1b[0m\n`);
}

/**
 * Creates the content of the library.
 *
 * @function ()
 * @private
 * @param {}                -,
 * @returns {}              -,
 * @since 0.0.0
 */
function _docore() {
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
 * Creates the UMD Module.
 *
 * @function ()
 * @private
 * @param {}                -,
 * @returns {}              -,
 * @since 0.0.0
 */
function _doumdlib() {
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
 *
 * @function ()
 * @private
 * @param {}                -,
 * @returns {}              -,
 * @since 0.0.0
 */
function _domodule() {
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
 *
 * @function ()
 * @private
 * @param {}                -,
 * @returns {}              -,
 * @since 0.0.0
 */
function _delcore() {
  const d1 = new Date();
  process.stdout.write('Starting \'\x1b[36mdelcore\x1b[89m\x1b[0m\'...\n');
  fs.unlinkSync(`${destination}/core.js`);

  const d2 = new Date() - d1;
  process.stdout.write(`Finished '\x1b[36mdelcore\x1b[89m\x1b[0m' after \x1b[35m${d2} ms\x1b[89m\x1b[0m\n`);
}


// -- Main ---------------------------------------------------------------------

/**
 * Executes the script.
 *
 * @function ()
 * @public
 * @param {}                -,
 * @returns {}              -,
 * @since 0.0.0
 */
function run() {
  if (parsed.help) {
    _help();
    return;
  }

  if (parsed.version) {
    process.stdout.write(`version: ${parsed.version}\n`);
    return;
  }

  const d1 = new Date();
  process.stdout.write('Starting \'\x1b[36mbuild:js:dev\x1b[89m\x1b[0m\'...\n');

  _clean();
  _docore();
  _doumdlib();
  _domodule();
  _delcore();

  const d2 = new Date() - d1;
  process.stdout.write(`Finished '\x1b[36mbuild:js:dev\x1b[89m\x1b[0m' after \x1b[35m${d2} ms\x1b[89m\x1b[0m\n`);
}


// Start script.
run();


// -- oOo --
