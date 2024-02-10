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
 *  . _doES6                      creates the ES6 module,
 *  . _doUMD                      creates the UMD library,
 *  . _doLib                      creates one UMD/ES6 library,
 *  . _doLibs                     creates all UMD/ES6 libraries,
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
    , { src }     = config
    , { libname } = config
    , { name }    = config
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
 * @function ([arg1])
 * @private
 * @param {Function}        the function to call at the completion,
 * @returns {object}        returns a promise,
 * @since 0.0.0
 */
function _clean(done) {
  const d1 = new Date();
  process.stdout.write('Starting \'\x1b[36mclean\x1b[89m\x1b[0m\'...\n');

  return new Promise((resolve) => {
    fs.rm(destination, { force: true, recursive: true }, (err1) => {
      if (err1) throw new Error(err1);

      fs.mkdir(destination, { recursive: true }, (err2) => {
        if (err2) throw new Error(err2);

        const d2 = new Date() - d1;
        process.stdout.write(`Finished '\x1b[36mclean\x1b[89m\x1b[0m' after \x1b[35m${d2} ms\x1b[89m\x1b[0m\n`);
        resolve();
        if (done) done();
      });
    });
  });
}

/**
 * Creates the ES6 module.
 *
 * @function (arg1, arg2, arg3, arg4)
 * @private
 * @param {String}          the header of the library,
 * @param {String}          the content of the library,
 * @param {String}          the footer of the library,
 * @param {Function}        the function to call at the completion,
 * @returns {}              -,
 * @since 0.0.0
 */
function _doES6(head, core, foot, done) {
  const d1 = new Date();
  process.stdout.write('Starting \'\x1b[36mdo:es6\x1b[89m\x1b[0m\'...\n');

  let exportM = '\n// -- Export\n';
  exportM += `export default ${ES6GLOB}.${libname};`;

  let lib = head;
  lib += '\n';
  lib += core;
  lib += '\n';
  lib += foot;

  lib = lib
    .replace('{{lib:es6:define}}', `const ${ES6GLOB} = {};`)
    .replace('{{lib:es6:link}}', ES6GLOB)
    .replace('{{lib:es6:export}}', exportM)
    // fix the blanck lines we indented too:
    .replace(/\s{2}\n/g, '\n')
  ;

  fs.writeFile(`${destination}/${name}.mjs`, lib, { encoding: 'utf8' }, (err) => {
    if (err) throw new Error(err);
    const d2 = new Date() - d1;
    process.stdout.write(`Finished '\x1b[36mdo:es6\x1b[89m\x1b[0m' after \x1b[35m${d2} ms\x1b[89m\x1b[0m\n`);
    done();
  });
}

/**
 * Creates the UMD library.
 *
 * @function (arg1, arg2, arg3, arg4)
 * @private
 * @param {String}          the header of the library,
 * @param {String}          the content of the library,
 * @param {String}          the footer of the library,
 * @param {Function}        the function to call at the completion,
 * @returns {}              -,
 * @since 0.0.0
 */
function _doUMD(head, core, foot, done) {
  const d1 = new Date();
  process.stdout.write("Starting '\x1b[36mdo:umd\x1b[89m\x1b[0m'...\n");

  let lib = head;
  lib += '\n';
  lib += core;
  lib += '\n';
  lib += foot;

  lib = lib
    .replace('{{lib:es6:define}}\n', '')
    .replace('{{lib:es6:link}}', 'this')
    .replace('{{lib:es6:export}}\n', '')
    // fix the blanck lines we indented too:
    .replace(/\s{2}\n/g, '\n')
  ;

  fs.writeFile(`${destination}/${name}.js`, lib, { encoding: 'utf8' }, (err) => {
    if (err) throw new Error(err);
    const d2 = new Date() - d1;
    process.stdout.write(`Finished '\x1b[36mdo:umd\x1b[89m\x1b[0m' after \x1b[35m${d2} ms\x1b[89m\x1b[0m\n`);
    done();
  });
}

/**
 * Creates one UMD/ES6 library.
 *
 * @function (arg1, arg2)
 * @private
 * @param {Array}           the files defining the library,
 * @param {Function}        the function to call at the completion,
 * @returns {}              -,
 * @since 0.0.0
 */
function _doLib(source, done) {
  const head = fs.readFileSync(source[0])
      , core = source.slice(1, -1)
      , foot = fs.readFileSync(source[source.length - 1])
      ;

  let content = '';
  for (let i = 0; i < core.length; i++) {
    content += fs.readFileSync(core[i]);
    if (i < core.length - 1) {
      content += '\n';
    }
  }

  content = content
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
  // For testing purpose:
  // fs.writeFileSync(`${destination}/${name}-${suffix}-core.js`, src);

  /**
   * Waits until completion.
   */
  let count = 2;
  function _next() {
    count -= 1;
    if (!count) {
      done();
    }
  }
  _doUMD(head, content, foot, _next);
  _doES6(head, content, foot, _next);
}

/**
 * Creates all UMD/ES6 libraries.
 *
 * @function (arg1)
 * @private
 * @param {Function}        the function to call at the completion,
 * @returns {}              -,
 * @since 0.0.0
 */
function _doLibs(done) {
  let pending = 1;
  /**
   * Waits until completion.
   */
  function _next() {
    pending -= 1;
    if (!pending) {
      done();
    }
  }

  _doLib(src, () => {
    _next();
  });
}


// -- Public Static Methods ----------------------------------------------------

const Lib = {

  /**
   * Executes the script.
   *
   * @method ()
   * @public
   * @param {}                -,
   * @returns {}              -,
   * @since 0.0.0
  */
  async run() {
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

    _clean(() => {
      _doLibs(() => {
        const d2 = new Date() - d1;
        process.stdout.write(`Finished '\x1b[36mbuild:js:dev\x1b[89m\x1b[0m' after \x1b[35m${d2} ms\x1b[89m\x1b[0m\n`);
      });
    });
  },
};


// -- Where the script starts --------------------------------------------------
Lib.run();


// -- oOo --
