// ESLint declarations:
/* global describe */
/* eslint one-var: 0, semi-style: 0 */


// -- Vendor Modules


// -- Local Modules
import ES6lib from '../index.js';
// import ES6lib from '../lib/es6lib.mjs';
import pack from '../package.json' with { type: 'json' };
import testlib from './int/libprototypal.js';


// -- Local Constants
const libname = 'ES6lib';


// -- Local Variables


// -- Main
describe('Test ES6lib:', () => {
  testlib(ES6lib, libname, pack.version, 'without new');
});


// - oOo --
