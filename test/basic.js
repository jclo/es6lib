// ESLint declarations:
/* global describe, it */
/* eslint one-var: 0, no-unused-vars: 0, semi-style: 0, no-underscore-dangle: 0 */

'use strict';

// -- Vendor Modules
const should     = require('chai').should()
    , { expect } = require('chai')
    ;


// -- Local Modules
const ES6lib = require('../index.js')
    , pack   = require('../package.json')
    ;


// -- Local Constants
const libname = 'ES6lib';


// -- Local Variables


// -- Main
describe('Test ES6lib:', () => {
  // Test the lib:
  describe('Test ES6lib.NAME and ES6lib.VERSION:', () => {
    it(`Expects ES6lib.NAME to return the string "${libname}".`, () => {
      expect(ES6lib.NAME).to.be.a('string').that.is.equal(libname);
    });

    it('Expects ES6lib.VERSION to return a string.', () => {
      expect(ES6lib.VERSION).to.be.a('string').that.is.equal(pack.version);
    });
  });

  describe('Test ES6lib private methods:', () => {
    it('Expects ES6lib._setTestMode to be a function.', () => {
      expect(ES6lib).own.property('_setTestMode').that.is.a('function');
    });

    it('Expects ES6lib._setTestMode() to return an empty array.', () => {
      expect(ES6lib._setTestMode()).to.be.an('array').that.has.lengthOf(0);
    });
  });

  describe('Test the ES6lib mandatory public methods:', () => {
    // noConflict
    it('Expects ES6lib.noConflict to be a function.', () => {
      expect(ES6lib).to.own.property('noConflict').that.is.a('function');
    });

    it('Expects ES6lib.noConflict() to return an object.', () => {
      expect(ES6lib.noConflict()).to.be.an('object');
    });

    // whoami
    it('Expects ES6lib.whoami to be a function.', () => {
      expect(ES6lib).to.own.property('whoami').that.is.a('function');
    });

    it('Expects ES6lib.whoami() to return an object.', () => {
      expect(ES6lib.whoami()).to.be.an('object');
    });

    it('Expects this object to own two properties.', () => {
      expect(Object.keys(ES6lib.whoami())).to.be.an('array').that.has.lengthOf(2);
    });

    it('Expects this object to own the property "name".', () => {
      expect(ES6lib.whoami()).to.own.property('name').that.is.equal(libname);
    });

    it('Expects this object to own the property "version".', () => {
      expect(ES6lib.whoami()).to.own.property('version').that.is.equal(pack.version);
    });
  });

  describe('Test the ES6lib specific public methods:', () => {
    it('Expects ES6lib to own the method "getString".', () => {
      expect(ES6lib).to.own.property('getString').that.is.a('function');
    });

    it('Expects ES6lib.getString() to return the string "I am a string!".', () => {
      expect(ES6lib.getString()).to.be.a('string').that.is.equal('I am a string!');
    });

    it('Expects ES6lib to own the method "getArray".', () => {
      expect(ES6lib).to.own.property('getArray').that.is.a('function');
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
