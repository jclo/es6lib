// ESLint declarations:
/* global describe, it */
/* eslint one-var: 0, no-unused-vars: 0, semi-style: 0 */

'use strict';

// -- Vendor Modules
const should     = require('chai').should()
    , { expect } = require('chai')
    ;


// -- Local Modules
const ES6lib = require('../index.js')
    ;


// -- Local Constants


// -- Local Variables


// -- Main
describe('Test ES6lib:', () => {
  // Test the lib:
  describe('Test ES6lib.VERSION and ES6lib.noConflict:', () => {
    it('Expects ES6lib.VERSION to return a string.', () => {
      expect(ES6lib.VERSION).to.be.a('string');
    });
    it('Expects ES6lib.noConflict to return a function.', () => {
      expect(ES6lib.noConflict).to.be.a('function');
    });
  });

  describe('Test the ES6lib methods:', () => {
    //
    it('Expects ES6lib to own the method "getString".', () => {
      expect(ES6lib.getString).to.be.a('function');
    });

    it('Expects ES6lib.getString() to return the string "I am a string!".', () => {
      expect(ES6lib.getString()).to.be.a('string').that.is.equal('I am a string!');
    });

    it('Expects ES6lib to own the method "getArray".', () => {
      expect(ES6lib.getArray).to.be.a('function');
    });

    it('Expects ES6lib.getArray() to return an array with 3 elements.', () => {
      expect(ES6lib.getArray()).to.be.an('array').that.has.lengthOf(3);
    });

    it('Expects the first element to be equal to 1.', () => {
      expect(ES6lib.getArray()[0]).to.be.a('number').that.is.equal(1);
    });

    it('Expects the second element to be equal to 2.', () => {
      expect(ES6lib.getArray()[1]).to.be.a('number').that.is.equal(2);
    });

    it('Expects the third element to be equal to 3.', () => {
      expect(ES6lib.getArray()[2]).to.be.a('number').that.is.equal(3);
    });
  });
});
