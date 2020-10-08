#!/usr/bin/env node
/* *****************************************************************************
 * es6lib.js creates the skeleton for writing ES6 Javascript libraries.
 *
 * The MIT License (MIT)
 *
 * Copyright (c) 2020 Mobilabs <contact@mobilabs.fr> (http://www.mobilabs.fr)
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
/* eslint one-var: 0, semi-style: 0, no-underscore-dangle: 0 */

'use strict';

// -- Vendor Modules
const fs    = require('fs')
    , nopt  = require('nopt')
    , path  = require('path')
    , shell = require('shelljs')
    ;


// -- Local Variables
const defBoilerLib  = 'ES6lib'
    /* eslint-disable-next-line object-curly-newline */
    , defAuthor   = { name: 'John Doe', acronym: 'jdo', email: 'jdo@johndoe.com', url: 'http://www.johndoe.com' }
    , copyright   = `Copyright (c) ${new Date().getFullYear()} {{author:name}} <{{author:email}}> ({{author:url}})`
    , baseapp     = process.cwd()
    , baseboiler  = __dirname.replace('/bin', '')
    , { version } = require('../package.json')
    , src         = 'src'
    , test        = 'test'
    , tasks       = 'tasks'
    , docs        = 'docs'
    // Command line Options
    , opts = {
      help: [Boolean, false],
      version: [String, null],
      path,
      boilerlib: [String, null],
      name: [String, null],
      author: [String, null],
      acronym: [String, null],
      email: [String, null],
      url: [String, null],
    }
    , shortOpts = {
      h: ['--help'],
      v: ['--version', version],
      p: ['--path'],
      b: ['--boilerlib'],
      n: ['--name'],
      a: ['--author'],
      c: ['--acronym'],
      e: ['--email'],
      u: ['--url'],
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
  '  * Initial commit,',
  '  * ...,',
  ''].join('\n');

const index = [
  "'use strict';",
  '',
  "module.exports = require('./lib/{{lib:lowname}}');",
  ''].join('\n');

const gitignore = [
  '.DS_Store',
  '',
  '.nyc_output',
  'coverage',
  'node_modules',
  ''].join('\n');

const eslintignore = [
  '_dist/lib/{{lib:lowname}}.min.*',
  ''].join('\n');

const npmignore = [
  '*',
  '!_dist/**/*',
  ''].join('\n');


// -- Private Functions --------------------------------------------------------

/**
 * Dispays the help message.
 *
 * @function ()
 * @private
 * @param {}           -,
 * @returns {}         -,
 * @since 0.0.0
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
    '-b, --boilerlib     the name of the boilerplate',
    '-n, --name          the name of the app',
    '-a, --author        the name of the author (ex. "John Doe")',
    '-c, --acronym       the acronym of the author (ex. jdo)',
    '-e, --email         the email address of the author (ex. jdo@johndoe.com)',
    '-u, --url           the website of the author (ex. http://www.johndoe.com)',
    '',
  ].join('\n');

  process.stdout.write(`${message}\n`);
  process.exit(0);
}

/**
 * Removes the cached files and returns the array.
 *
 * @function (arg1)
 * @private
 * @param {Array}           an array of files,
 * @returns {Array}         returns the filtered array,
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
 * Checks if the application folder is empty.
 *
 * @function (arg1)
 * @private
 * @param {String}          the folder path,
 * @returns {Boolean}       returns true if empty,
 */
function _isFolderEmpty(folder) {
  const authFiles = ['etc', 'package.json', 'package-lock.json', 'node_modules'];

  let files = _filter(fs.readdirSync(folder));
  files = files.filter((file) => authFiles.indexOf(file) === -1);
  return !files.length;
}

/**
 * Creates the App skeleton.
 *
 * @function (arg1, arg2, arg3, arg4)
 * @private
 * @param {String}          the source path,
 * @param {String}          the App name,
 * @param {Object}          the author credentials,
 * @param {String}          the copyright text,
 * @returns {}              -,
 */
function _addSkeleton(base, app, owner, cright) {
  const newFiles = [
    [readme, license, changelog, gitignore, eslintignore, npmignore, index],
    [
      'README.md', 'LICENSE.md', 'CHANGELOG.md', '.gitignore', '.eslintignore',
      '.npmignore', 'index.js',
    ],
  ];

  let input;
  let s;
  for (let i = 0; i < newFiles[0].length; i++) {
    input = newFiles[0][i]
      .replace('{{lib:name}}', app)
      .replace('{{lib:lowname}}', app.toLowerCase())
      .replace('{{lib:copyright}}', cright)
      .replace('{{author:name}}', owner.name)
      .replace('{{author:email}}', owner.email)
      .replace('{{author:url}}', owner.url)
    ;

    process.stdout.write(`  added ${newFiles[1][i]}\n`);
    s = new shell.ShellString(input);
    s.to(`${base}/${newFiles[1][i]}`);
  }
}

/**
 * Duplicates generic files.
 *
 * @function (arg1, arg2)
 * @private
 * @param {String}          the source path,
 * @param {String}          the destination path,
 * @returns {}              -,
 */
function _duplicate(source, dest) {
  const dupFiles = ['.eslintrc', '.travis.yml', 'gulpfile.js'];

  for (let i = 0; i < dupFiles.length; i++) {
    process.stdout.write(`  copied ${dupFiles[i]}\n`);
    shell.cp(`${source}/${dupFiles[i]}`, `${dest}/.`);
  }
}

/**
 * Customizes 'Package.json'.
 *
 * @function (arg1, arg2, arg3, arg4, arg5)
 * @private
 * @param {String}          the source path,
 * @param {String}          the destination path,
 * @param {Object}          the author credentials,
 * @param {String}          the name of the boilerplate,
 * @returns {}              -,
 */
function _customize(source, dest, app, owner, boilerlib) {
  const npm = 'package.json';

  const json = shell.cat(`${source}/${npm}`);
  const obj = JSON.parse(json.stdout);

  const pack = {};
  pack.name = app.toLowerCase();
  pack.version = '0.0.0-alpha.0';
  pack.description = `${app} ...`;
  pack.main = `_dist/lib/${app.toLowerCase()}.js`;
  pack.minified = `_dist/lib/${app.toLowerCase()}.min.js`;
  pack.unpkg = `_dist/lib/${app.toLowerCase()}.mjs`;
  pack.module = `_dist/lib/${app.toLowerCase()}.min.mjs`;
  pack.bin = {};
  pack.scripts = {
    build: obj.scripts.build,
    watch: obj.scripts.watch,
    dev: obj.scripts.dev,
    test: obj.scripts.test,
    'display-coverage': obj.scripts['display-coverage'],
    'check-coverage': obj.scripts['check-coverage'],
    'report-coverage': obj.scripts['report-coverage'],
    report: obj.scripts.report,
    makedist: obj.scripts.makedist,
    app: obj.scripts.app,
    makeprivate: obj.scripts.makeprivate,
    makelib: obj.scripts.makelib,
    doc: obj.scripts.doc,
  };
  pack.repository = obj.repository;
  pack.repository.url = `https://github.com/${owner.acronym}/${app.toLowerCase()}.git`;
  pack.keywords = ['ES6'];
  pack.author = obj.author;
  pack.author.name = owner.name;
  pack.author.email = owner.email;
  pack.author.url = owner.url;
  pack.license = obj.license;
  pack.bugs = obj.bugs;
  pack.bugs.url = `https://github.com/${owner.acronym}/${app.toLowerCase()}/issues`;
  pack.homepage = `https://github.com/${owner.acronym}/${app.toLowerCase()}`;
  pack.dependencies = obj.dependencies;
  pack.devDependencies = obj.devDependencies;
  pack.publishConfig = obj.publishConfig;
  pack.private = obj.private;
  pack.husky = obj.husky;

  pack.devDependencies[`@mobilabs/${boilerlib.toLocaleLowerCase()}`] = version;

  delete pack.dependencies['@mobilabs/kasar'];
  delete pack.dependencies.nopt;
  delete pack.dependencies.shelljs;

  process.stdout.write(`  updated ${npm}\n`);
  json.stdout = JSON.stringify(pack, null, 2);
  json.to(`${baseapp}/${npm}`);
}

/**
 * Adds the source files.
 *
 * @function (arg1, arg2, arg3, arg4, arg5)
 * @private
 * @param {String}          the source path,
 * @param {String}          the destination path,
 * @param {String}          the destination folder,
 * @param {String}          the name of the app,
 * @param {String}          the name of the boilerplate,
 * @returns {}              -,
 */
function _addSrc(source, dest, folder, app, boilerlib) {
  const exclude = [];

  // Copy contents of source folder recursively to dest:
  process.stdout.write(`  duplicated the contents of ${folder}\n`);
  shell.mkdir('-p', `${dest}/${folder}`);
  shell.cp('-r', `${source}/${folder}/*`, `${dest}/${folder}/.`);

  for (let i = 0; i < exclude.length; i++) {
    shell.rm('-f', `${dest}/${folder}/${exclude[i]}`);
  }

  // Replace the name 'boilerlib' by 'app' to dest:
  const re = new RegExp(boilerlib, 'g');
  const f = shell.find(`${dest}/${folder}`).filter((file) => file.match(/(\.js)|(_header)|(_footer)/));
  for (let i = 0; i < f.length; i++) {
    shell.sed('-i', re, app, f[i]);
  }
}

/**
 * Adds the task files.
 *
 * @function (arg1, arg2, arg3, arg4, arg5)
 * @private
 * @param {String}          the source path,
 * @param {String}          the destination path,
 * @param {String}          the destination folder,
 * @param {String}          the App name,
 * @param {String}          the name of the boilerplate,
 * @returns {}              -,
 */
function _addTasks(source, dest, folder, app, boilerlib) {
  const exclude = []
      , boiler  = '{{boiler:name}}'
      , ver     = '{{boiler:name:version}}'
      ;

  process.stdout.write(`  duplicated the contents of ${folder}\n`);
  shell.mkdir('-p', `${dest}/${folder}`);
  shell.cp('-r', `${source}/${folder}/*`, `${dest}/${folder}/.`);

  for (let i = 0; i < exclude.length; i++) {
    shell.rm('-f', `${dest}/${folder}/${exclude[i]}`);
  }

  // Replace 'boilerlib' by 'app' to config.js and add the version
  // of the boilerplate:
  shell.sed('-i', boilerlib, app, `${dest}/${folder}/config.js`);
  shell.sed('-i', boiler, boilerlib, `${dest}/${folder}/config.js`);
  shell.sed('-i', ver, version, `${dest}/${folder}/config.js`);
}

/**
 * Adds the test files.
 *
 * @function (arg1, arg2, arg3, arg4, arg5)
 * @private
 * @param {String}          the source path,
 * @param {String}          the destination path,
 * @param {String}          the destination folder,
 * @param {String}          the name of the app,
 * @param {String}          the name of the boilerplate,
 * @returns {}              -,
 */
function _addTest(source, dest, folder, app, boilerlib) {
  const exclude = [];

  process.stdout.write(`  duplicated the contents of ${folder}\n`);
  shell.mkdir('-p', `${dest}/${folder}`);
  shell.cp('-r', `${source}/${folder}/*`, `${dest}/${folder}/.`);

  for (let i = 0; i < exclude.length; i++) {
    shell.rm('-f', `${dest}/${folder}/${exclude[i]}`);
  }

  // Replace the name 'boilerlib' by 'app' to dest:
  const re = new RegExp(boilerlib, 'g');
  const f = shell.find(`${dest}/${folder}`).filter((file) => file.match(/\.js$/));
  for (let i = 0; i < f.length; i++) {
    shell.sed('-i', re, app, f[i]);
  }
}

/**
 * Creates and populates the web app.
 *
 * @function (arg1)
 * @private
 * @param {Object}    the command line options,
 * @returns {}        -,
 */
function _populate(options) {
  const boilerlib = options && options.boilerlib && options.boilerlib !== 'true'
    ? options.boilerlib
    : defBoilerLib;

  const app = options && options.name && options.name !== 'true'
    ? options.name
    : 'myApp';

  let author;
  if (!options || (!options.author && !options.acronym && !options.email && !options.url)) {
    author = defAuthor;
  } else {
    author = {
      name: 'Unknown', acronym: 'undefined', email: 'undefined', url: 'undefined',
    };
  }

  author.name = options && options.author && options.author !== 'true'
    ? options.author
    : author.name;

  author.acronym = options && options.acronym && options.acronym !== 'true'
    ? options.acronym
    : author.acronym;

  author.email = options && options.email && options.email !== 'true'
    ? options.email
    : author.email;

  author.url = options && options.url && options.url !== 'true'
    ? options.url
    : author.url;

  const resp = _isFolderEmpty(baseapp);
  if (!resp) {
    process.stdout.write('This folder already contains files and/or folders. Clean it up first! Process aborted...\n');
    process.exit(1);
  }

  // Create README.md, LICENSE.md, CHANGELOG.md, etc.:
  process.stdout.write('Ok, the folder is empty\n');
  _addSkeleton(baseapp, app, author, copyright);

  // Copy files:
  _duplicate(baseboiler, baseapp);

  // Add and customize package.json:
  _customize(baseboiler, baseapp, app, author, boilerlib);

  // Copy the src files:
  _addSrc(baseboiler, baseapp, src, app, boilerlib);

  // Add tasks:
  _addTasks(baseboiler, baseapp, tasks, app, boilerlib);

  // Copy Test Files:
  _addTest(baseboiler, baseapp, test, app, boilerlib);

  process.stdout.write('Done. Enjoy!\n');
}


// -- Main
if (parsed.help) {
  _help();
}

if (parsed.version) {
  process.stdout.write(`version: ${parsed.version}\n`);
  process.exit(0);
}

if (parsed.argv.remain[0] === 'populate') {
  _populate(parsed);
} else {
  _help();
}
