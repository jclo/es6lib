/* eslint one-var: 0, import/no-extraneous-dependencies: 0, semi-style: 0 */

'use strict';

// -- Vendor Modules
const fs   = require('fs')
    , path = require('path')
    ;


// -- Local Modules
const config = require('./config')
    ;


// -- Local Constants
const tmppriv      = './private_repo/tmp'
    , { name }     = config
    , { index }    = config
    , { distlink } = config
    ;


// -- Local Variables


// -- Private Tasks

/**
 * Removes the previous version.
 */
function clear() {
  const d1 = new Date();
  process.stdout.write('Starting \'\x1b[36mclear\x1b[89m\x1b[0m\'...\n');


  fs.rmSync(tmppriv, { force: true, recursive: true });
  fs.mkdirSync(tmppriv, { recursive: true });

  const d2 = new Date() - d1;
  process.stdout.write(`Finished '\x1b[36mclear\x1b[89m\x1b[0m' after \x1b[35m${d2} ms\x1b[89m\x1b[0m\n`);
}


/**
 * Copies the modified index.
 */
function copyindex() {
  const d1 = new Date();
  process.stdout.write('Starting \'\x1b[36mcopyindex\x1b[89m\x1b[0m\'...\n');

  let f = fs.readFileSync(index, 'utf-8');
  f = f.replace(`./lib/${name}`, distlink);

  const filename = path.basename(index);
  fs.writeFileSync(`${tmppriv}/${filename}`, f);
  const d2 = new Date() - d1;
  process.stdout.write(`Finished '\x1b[36mcopyindex\x1b[89m\x1b[0m' after \x1b[35m${d2} ms\x1b[89m\x1b[0m\n`);
}


/**
 * Copies the modified package.json
 */
function copypackagejson() {
  const d1 = new Date();
  process.stdout.write('Starting \'\x1b[36mcopypackagejson\x1b[89m\x1b[0m\'...\n');

  const json = fs.readFileSync('./package.json', 'utf8');
  const obj = JSON.parse(json);

  obj.main = distlink;
  obj.bin = {};
  obj.scripts = {};
  obj.dependencies = {};
  obj.devDependencies = {};
  obj.private = true;
  obj.husky = {};

  fs.writeFileSync(`${tmppriv}/package.json`, JSON.stringify(obj, null, 2), 'utf8');

  const d2 = new Date() - d1;
  process.stdout.write(`Finished '\x1b[36mcopypackagejson\x1b[89m\x1b[0m' after \x1b[35m${d2} ms\x1b[89m\x1b[0m\n`);
}


// -- Public Task(s)
const d1 = new Date();
process.stdout.write('Starting \'\x1b[36mdep:private\x1b[89m\x1b[0m\'...\n');

clear();
copyindex();
copypackagejson();

const d2 = new Date() - d1;
process.stdout.write(`Finished '\x1b[36mdep:private\x1b[89m\x1b[0m' after \x1b[35m${d2} ms\x1b[89m\x1b[0m\n`);


// -- oOo --
