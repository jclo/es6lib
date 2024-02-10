// ESLint declarations:
/* global describe */
/* eslint one-var: 0, semi-style: 0 */

'use strict';

// -- Vendor Modules


// -- Local Modules
const ES6lib  = require('../index')
    , pack    = require('../package.json')
    , testlib = require('./int/libprototypal')
    ;


// -- Local Constants
const libname = 'ES6lib';


// -- Local Variables


// -- Main
describe('Test ES6lib:', () => {
  testlib(ES6lib, libname, pack.version, 'without new');
});


// - oOo --
