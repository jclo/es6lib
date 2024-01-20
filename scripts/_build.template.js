#!/usr/bin/env node
/* *****************************************************************************
 *
 * Does ...
 *
 * build:template script is a framework to build npm build scripts;
 *
 * Private Functions:
 *  . _help                       displays the help message,
 *  . _clean                      removes the previous build,
 *  . _dosomething                creates something,
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
/* eslint one-var: 0, semi-style: 0, no-underscore-dangle: 0,
  import/no-extraneous-dependencies: 0 */

'use strict';

// -- Vendor Modules
const fs   = require('fs')
    , nopt = require('nopt')
    ;


// -- Local Modules
const config = require('./config')
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
    '                       creates something from something',
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
 * @returns {Object}        returns a promise,
 * @since 0.0.0
 */
function _clean() {
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
      });
    });
  });
}

/**
 * Creates something else.
 *
 * @function (arg1)
 * @private
 * @param {Function}        the function to call at the completion,
 * @returns {}              -,
 * @since 0.0.0
 */
function _doparallel1(done) {
  const d1 = new Date();
  process.stdout.write('Starting \'\x1b[36mdoparallel1\x1b[89m\x1b[0m\'...\n');

  fs.writeFile(`${destination}/generic1.js`, 'bla bla', { encoding: 'utf8' }, (err) => {
    if (err) throw new Error(err);

    const d2 = new Date() - d1;
    process.stdout.write(`Finished '\x1b[36mdodoparallel1\x1b[89m\x1b[0m' after \x1b[35m${d2} ms\x1b[89m\x1b[0m\n`);
    done();
  });
}

/**
 * Creates something else.
 *
 * @function (arg1)
 * @private
 * @param {Function}        the function to call at the completion,
 * @returns {}              -,
 * @since 0.0.0
 */
function _doparallel2(done) {
  const d1 = new Date();
  process.stdout.write('Starting \'\x1b[36mdoparallel2\x1b[89m\x1b[0m\'...\n');

  fs.writeFile(`${destination}/generic2.js`, 'bla bla', { encoding: 'utf8' }, (err) => {
    if (err) throw new Error(err);

    const d2 = new Date() - d1;
    process.stdout.write(`Finished '\x1b[36mdodoparallel2\x1b[89m\x1b[0m' after \x1b[35m${d2} ms\x1b[89m\x1b[0m\n`);
    done();
  });
}

/**
 * Removes the temp file(s).
 *
 * @function (arg1)
 * @private
 * @param {Function}        the function to call at the completion,
 * @returns {}              -,
 * @since 0.0.0
 */
function _delgeneric(done) {
  const d1 = new Date();
  process.stdout.write('Starting \'\x1b[36mdelgeneric\x1b[89m\x1b[0m\'...\n');

  /**
   * Wait all the processes are completed.
   */
  let pending = 2;
  function _next() {
    pending -= 1;
    if (!pending) {
      const d2 = new Date() - d1;
      process.stdout.write(`Finished '\x1b[36mdelgeneric\x1b[89m\x1b[0m' after \x1b[35m${d2} ms\x1b[89m\x1b[0m\n`);
      done();
    }
  }

  fs.unlink(`${destination}/generic1.js`, (err) => {
    if (err) throw new Error(err);
    _next();
  });

  fs.unlink(`${destination}/generic2.js`, (err) => {
    if (err) throw new Error(err);
    _next();
  });
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
async function run() {
  const PENDING = 2;

  if (parsed.help) {
    _help();
    return;
  }

  if (parsed.version) {
    process.stdout.write(`version: ${parsed.version}\n`);
    return;
  }

  const d1 = new Date();
  process.stdout.write('Starting \'\x1b[36mbuild:xxx:yyy\x1b[89m\x1b[0m\'...\n');

  let pending = PENDING;
  /**
   * Executes done until completion.
   */
  function done() {
    pending -= 1;
    if (!pending) {
      _delgeneric(() => {
        const d2 = new Date() - d1;
        process.stdout.write(`Finished '\x1b[36mbuild:xxx:yyy\x1b[89m\x1b[0m' after \x1b[35m${d2} ms\x1b[89m\x1b[0m\n`);
      });
    }
  }

  await _clean();
  _doparallel1(done);
  _doparallel2(done);
}


// Start script.
run();


// -- oOo --
