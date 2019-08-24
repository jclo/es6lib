#!/usr/bin/env node
/* *****************************************************************************
 * es6lib.js creates the skeleton for writing ES6 Javascript libraries.
 *
 * The MIT License (MIT)
 *
 * Copyright (c) 2019 Mobilabs <contact@mobilabs.fr> (http://www.mobilabs.fr)
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 * ************************************************************************** */
/* eslint one-var: 0,semi-style: 0 */

'use strict';

// -- Node modules
const fs           = require('fs')
    , { Readable } = require('stream')
    , nopt         = require('nopt')
    , path         = require('path')
    ;

// -- Global variables
const boilerlib   = 'ES6lib'
    /* eslint-disable-next-line object-curly-newline */
    , author = { name: 'John Doe', acronym: 'jdo', email: 'jdo@johndoe.com', url: 'http://www.johndoe.com' }
    , copyright   = 'Copyright (c) 2019 {{author:name}} <{{author:email}}> ({{author:url}})'
    , baseapp     = process.cwd()
    , baseumdlib  = __dirname.replace('/bin', '')
    , { version } = require('../package.json')
    , src         = 'src'
    , test        = 'test'
    , tasks       = 'tasks'
    , docs        = 'docs'
    // Command line Options
    , opts = {
      help: [Boolean, false],
      version: [String, null],
      collection: [Boolean, false],
      path,
      name: [String, null],
    }
    , shortOpts = {
      h: ['--help'],
      v: ['--version', version],
      c: ['--collection'],
      p: ['--path'],
      n: ['--name'],
    }
    , parsed = nopt(opts, shortOpts, process.argv, 2)
    ;

// -- Templates
const readme = [
  '# {{lib:name}}',
  ' ',
  'Bla bla ...',
  ' ',
  '## License',
  ' ',
  'MIT.',
  '',
].join('\n');

const license = [
  'The MIT License (MIT)',
  '',
  '{{lib:copyright}}',
  '',
  'Permission is hereby granted, free of charge, to any person obtaining a copy',
  'of this software and associated documentation files (the "Software"), to deal',
  'in the Software without restriction, including without limitation the rights',
  'to use, copy, modify, merge, publish, distribute, sublicense, and/or sell',
  'copies of the Software, and to permit persons to whom the Software is',
  'furnished to do so, subject to the following conditions:',
  '',
  'The above copyright notice and this permission notice shall be included in',
  'all copies or substantial portions of the Software.',
  '',
  'THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR',
  'IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,',
  'FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE',
  'AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER',
  'LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,',
  'OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN',
  'THE SOFTWARE.',
  '',
].join('\n');

const changelog = [
  '### HEAD',
  '',
  '',
  '### 0.0.0 (Month Day, Year)',
  '',
  '  * Initial build.',
  ''].join('\n');

const index = [
  "'use strict';",
  '',
  "module.exports = require('./lib/{{lib:lowname}}');",
  ''].join('\n');

const gitignore = '';
const eslintignore = '';


// -- Private functions --------------------------------------------------------
/* eslint-disable no-underscore-dangle */

/**
 * Removes the cached files and returns the array.
 *
 * @function (arg1)
 * @private
 * @param {Array}     an array of files,
 * @returns {Array}   returns the filtered array,
 */
function _filter(files) {
  const filtered = []
    ;

  for (let i = 0; i < files.length; i++) {
    if (!files[i].match(/^\./)) {
      filtered.push(files[i]);
    }
  }

  return filtered;
}

/**
 * Copies source file to destination.
 *
 * @function (arg1, arg2)
 * @private
 * @param {String}    the source file,
 * @param {String}    the destination file,
 * @returns {}        -,
 */
function _copyFile(source, dest) {
  fs.createReadStream(source).pipe(fs.createWriteStream(dest));
}

/**
 * Copies source file to destination with a filtering.
 *
 * @function (arg1, arg2, arg3)
 * @private
 * @param {String}    the source path,
 * @param {String}    the destination path,
 * @param {String}    the name of the library,
 * @returns {}        -,
 */
function _copyFileAndReplace(source, dest, app) {
  const re  = new RegExp(boilerlib, 'g')
      , re2 = new RegExp('{{template:version}}')
      ;
  let s
    ;

  fs.readFile(source, 'utf8', (error, data) => {
    if (error) { throw error; }
    s = data.replace(re, app).replace(re2, version);
    fs.writeFile(dest, s, 'utf8', (err) => {
      if (err) { throw err; }
    });
  });
}

/**
 * Recursively copies source to destination.
 *
 * @function (arg1, arg2, arg3, arg4, arg5, arg6)
 * @private
 * @param {String}    the source folder/file,
 * @param {String}    the destination folder/file,
 * @param {String}    the name of the library,
 * @param {String}    the relative path,
 * @param {Array}     the files not to copy,
 * @param {Boolean}   add or not chached files,
 * @returns {}        -,
 */
function _copyRecursiveSync(source, dest, app, destpath, excluFiles, addCachedFiles) {
  if (fs.statSync(source).isDirectory()) {
    fs.mkdirSync(dest);

    let files;
    if (addCachedFiles) {
      files = fs.readdirSync(source);
    } else {
      files = _filter(fs.readdirSync(source));
    }
    for (let i = 0; i < files.length; i++) {
      if (fs.statSync(`${source}/${files[i]}`).isDirectory()) {
        if (!excluFiles || excluFiles.indexOf(files[i]) === -1) {
          _copyRecursiveSync(`${source}/${files[i]}`, `${dest}/${files[i]}`, app, destpath, excluFiles, addCachedFiles);
        }
      } else {
        const lopath = destpath ? dest.replace(destpath, '') : dest;

        if (!excluFiles || excluFiles.indexOf(files[i]) === -1) {
          process.stdout.write(`  ${lopath}/${files[i]}\n`);
          _copyFileAndReplace(`${source}/${files[i]}`, `${dest}/${files[i]}`, app);
        }
      }
    }
  } else {
    _copyFileAndReplace(source, dest, app);
  }
}

/**
 * Copies source data to destination file.
 *
 * @function (arg1, arg2)
 * @private
 * @param {String}    the destination path,
 * @param {Array}     the files to create and their contents,
 * @returns {}        -,
 */
function _createFiles(destpath, files, app, owner, cpright) {
  let input
    , s
    ;

  for (let i = 0; i < files[0].length; i++) {
    input = files[0][i]
      .replace('{{lib:name}}', app)
      .replace('{{lib:lowname}}', app.toLowerCase())
      .replace('{{lib:copyright}}', cpright)
      .replace('{{author:name}}', owner.name)
      .replace('{{author:email}}', owner.email)
      .replace('{{author:url}}', owner.url)
    ;

    // Convert the string to a readable stream:
    s = new Readable();
    s.push(input);
    s.push(null);
    // Write the stream to the destination file:
    s.pipe(fs.createWriteStream(path.join(destpath, files[1][i])));
    process.stdout.write(`  ${files[1][i]}\n`);
  }
}

/**
 * Removes UMDLib dependencies to package.json.
 *
 * @function (arg1, arg2, arg3)
 * @private
 * @param {String}    the root path of UMDLib,
 * @param {String}    the root path of UMD library,
 * @param {String}    the name of the UMD library,
 * @returns {}        -,
 */
function _customizeApp(locbaseumdlib, locbaseapp, locappname, owner) {
  const npm   = 'package.json'
    ;

  // Read package.json:
  fs.readFile(path.join(locbaseumdlib, npm), 'utf8', (error, data) => {
    if (error) {
      throw error;
    }

    // Fix package.json:
    const obj = JSON.parse(data);
    const pack = {};
    pack.name = locappname.toLowerCase();
    pack.version = '0.0.0';
    pack.description = `${locappname} ...`;
    pack.main = obj.main;
    pack.bin = {};
    pack.scripts = obj.scripts;
    pack.repository = obj.repository;
    pack.repository.url = `https://github.com/${owner.acronym}/${locappname.toLowerCase()}.git`;
    pack.keywords = [];
    pack.author = obj.author;
    pack.author.name = owner.name;
    pack.author.email = owner.email;
    pack.author.url = owner.url;
    pack.license = obj.license;
    pack.bugs = obj.bugs;
    pack.bugs.url = `https://github.com/${owner.acronym}/${locappname.toLowerCase()}/issues`;
    pack.homepage = `https://github.com/${owner.acronym}/${locappname.toLowerCase()}`;
    pack.dependencies = obj.dependencies;
    pack.devDependencies = obj.devDependencies;
    pack.private = obj.private;
    pack.husky = obj.husky;

    delete pack.dependencies.nopt;
    delete pack.dependencies.path;

    // Write the updated package.json:
    fs.writeFile(path.join(locbaseapp, npm), JSON.stringify(pack, null, 2), 'utf8', (err) => {
      if (err) {
        throw err;
      }

      process.stdout.write(`  ${npm}\n`);
    });
  });
}

/**
 * Displays help message.
 *
 * @function ()
 * @private
 */
function _help() {
  const message = ['',
    'Usage: command [options]',
    '',
    'populate            populate the app',
    '',
    'Options:',
    '',
    '-h, --help          output usage information',
    '-v, --version       output the version number',
    '-n, --name          the name of the app',
    '',
  ].join('\n');

  process.stdout.write(`${message}\n`);
  process.exit(0);
}

/**
 * Creates and populates the web app.
 *
 * @function (arg1)
 * @private
 * @param {Object}    the command line options,
 * @returns {}        -,
 */
function _populate(locopts) {
  const app = locopts.name || 'myApp'
      , authFiles = ['etc', 'package.json', 'package-lock.json', 'node_modules', 'private_repo']

      , newFiles = [
        [readme, license, changelog, gitignore, eslintignore, index],
        ['README.md', 'LICENSE.md', 'CHANGELOG.md', '.gitignore', '.eslintignore', 'index.js'],
      ]
      , dupFiles = ['.travis.yml', '.eslintrc', 'gulpfile.js']
      , excludeTasks = []
      , excluSrc = []
      , exludeDocs = []
      ;

  // Check the folder app is empty:
  process.stdout.write('Checks that the folder app is empty...\n');
  let files = _filter(fs.readdirSync(baseapp));
  files = files.filter((file) => authFiles.indexOf(file) === -1);
  if (files.length) {
    process.stdout.write('This folder already contains files and/or folders. Clean it up first! Process aborted...\n');
    process.exit(1);
  }

  // Ok. Populate it:
  process.stdout.write('Populates the folder with:\n');

  // Create README.md, LICENSE.md, CHANGELOG.md, etc.:
  _createFiles(baseapp, newFiles, app, author, copyright);

  // Duplicate gulpfile, ...
  for (let i = 0; i < dupFiles.length; i++) {
    process.stdout.write(`  ${dupFiles[i]}\n`);
    _copyFile(path.join(baseumdlib, dupFiles[i]), path.join(baseapp, dupFiles[i]));
  }

  // Add and customize package.json:
  _customizeApp(baseumdlib, baseapp, app, author);

  // Copy Gulp Task files:
  _copyRecursiveSync(path.join(baseumdlib, tasks), path.join(baseapp, tasks), app, `${baseapp}/`, excludeTasks);

  // Copy Test Files:
  _copyRecursiveSync(path.join(baseumdlib, test), path.join(baseapp, test), app, `${baseapp}/`);

  // Copy Doc Files:
  _copyRecursiveSync(path.join(baseumdlib, docs), path.join(baseapp, docs), app, `${baseapp}/`, exludeDocs, true);

  // Copy Source Files:
  _copyRecursiveSync(path.join(baseumdlib, src), path.join(baseapp, src), app, `${baseapp}/`, excluSrc);

  setTimeout(() => {
    process.stdout.write('Done. Enjoy!\n');
  }, 1000);
}
/* eslint-disable no-underscore-dangle */

// -- Main
if (parsed.help) {
  _help();
}

if (parsed.version) {
  // console.log('umdlib version: ' + parsed.version);
  process.stdout.write(`${boilerlib} version: ${parsed.version}\n`);
  process.exit(0);
}

if (parsed.argv.remain[0] === 'populate') {
  _populate(parsed);
} else {
  _help();
}
