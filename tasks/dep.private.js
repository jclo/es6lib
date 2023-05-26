#!/usr/bin/env node
/* *****************************************************************************
 *
 * Creates a private npm package.
 *
 * dep:private script creates a npm package not to be published but used
 * locally.
 *
 * Private Functions:
 *  . _help                       displays the help message,
 *  . _clean                      removes the previous build,
 *  . _copyindex                  copies the modified index,
 *  . _copypackagejson            copies the modified package.json,
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
    , path = require('path')
    , nopt = require('nopt')
    ;


// -- Local Modules
const config = require('./config')
    ;


// -- Local Constants
const VERSION = '0.0.0-alpha.0'
    , opts = {
      help: [Boolean, false],
      version: [String, null],
    }
    , shortOpts = {
      h: ['--help'],
      v: ['--version', VERSION],
    }
    , parsed = nopt(opts, shortOpts, process.argv, 2)
    , tmppriv      = './private_repo/tmp'
    , { name }     = config
    , { index }    = config
    , { distlink } = config
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
    '                       creates a private npm package to be used locally',
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
    fs.rm(tmppriv, { force: true, recursive: true }, (err1) => {
      if (err1) throw new Error(err1);

      fs.mkdir(tmppriv, { recursive: true }, (err2) => {
        if (err2) throw new Error(err2);

        const d2 = new Date() - d1;
        process.stdout.write(`Finished '\x1b[36mclean\x1b[89m\x1b[0m' after \x1b[35m${d2} ms\x1b[89m\x1b[0m\n`);
        resolve();
      });
    });
  });
}

/**
 * Copies the modified index.
 *
 * @function (arg1)
 * @private
 * @param {Function}        the function to call at the completion,
 * @returns {}              -,
 * @since 0.0.0
 */
function _copyindex(done) {
  const d1 = new Date();
  process.stdout.write('Starting \'\x1b[36mcopyindex\x1b[89m\x1b[0m\'...\n');

  fs.readFile(index, 'utf8', (err1, data) => {
    if (err1) throw new Error(err1);

    const content = data.replace(`./lib/${name}`, distlink);
    fs.writeFile(`${tmppriv}/${path.basename(index)}`, content, { encoding: 'utf8' }, (err2) => {
      if (err2) throw new Error(err2);

      const d2 = new Date() - d1;
      process.stdout.write(`Finished '\x1b[36mcopyindex\x1b[89m\x1b[0m' after \x1b[35m${d2} ms\x1b[89m\x1b[0m\n`);
      done();
    });
  });
}

/**
 * Copies the modified package.json.
 *
 * @function (arg1)
 * @private
 * @param {Function}        the function to call at the completion,
 * @returns {}              -,
 * @since 0.0.0
 */
function _copypackagejson(done) {
  const d1 = new Date();
  process.stdout.write('Starting \'\x1b[36mcopypackagejson\x1b[89m\x1b[0m\'...\n');

  fs.readFile('./package.json', 'utf8', (err1, data) => {
    if (err1) throw new Error(err1);

    const obj = JSON.parse(data);
    obj.main = distlink;
    obj.bin = {};
    obj.scripts = {};
    obj.dependencies = {};
    obj.devDependencies = {};
    obj.private = true;
    obj.husky = {};

    fs.writeFile(`${tmppriv}/package.json`, JSON.stringify(obj, null, 2), { encooding: 'utf8' }, (err2) => {
      if (err2) throw new Error(err2);

      const d2 = new Date() - d1;
      process.stdout.write(`Finished '\x1b[36mcopypackagejson\x1b[89m\x1b[0m' after \x1b[35m${d2} ms\x1b[89m\x1b[0m\n`);
      done();
    });
  });
}


// -- Main ---------------------------------------------------------------------

/**
 * Executes the script.
 *
 * @function ()
 * @puublic
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
  process.stdout.write('Starting \'\x1b[36mdep:private\x1b[89m\x1b[0m\'...\n');

  let pending = PENDING;
  /**
   * Executes done until completion.
   */
  function done() {
    pending -= 1;
    if (!pending) {
      const d2 = new Date() - d1;
      process.stdout.write(`Finished '\x1b[36mdep:private\x1b[89m\x1b[0m' after \x1b[35m${d2} ms\x1b[89m\x1b[0m\n`);
    }
  }

  await _clean();
  _copyindex(done);
  _copypackagejson(done);
}


// Start script.
run();


// -- oOo --
