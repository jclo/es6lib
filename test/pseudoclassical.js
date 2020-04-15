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
    ;


// -- Local Constants


// -- Local Variables


// -- Main
describe('Test ES6lib:', () => {
  // Test the lib:
  describe('Test ES6lib.VERSION, ES6lib._setTestMode and ES6lib.noConflict:', () => {
    it('Expects ES6lib.VERSION to return a string.', () => {
      expect(ES6lib.VERSION).to.be.a('string');
    });

    it('Expects ES6lib._setTestMode to be a function.', () => {
      expect(ES6lib._setTestMode).to.be.a('function');
    });

    it('Expects ES6lib._setTestMode() to return an array.', () => {
      expect(ES6lib._setTestMode()).to.be.an('array');
    });

    it('Expects ES6lib.noConflict to be a function.', () => {
      expect(ES6lib.noConflict).to.be.a('function');
    });
  });

  describe('Test ES6lib constructor and methods:', () => {
    const o = new ES6lib('name');
    it('Expects new ES6lib("name") to return an object.', () => {
      expect(o).to.be.an('object');
    });

    it('Expects this object to own the property "getString" that is a function.', () => {
      expect(o).to.have.property('getString').that.is.a('function');
    });

    it('Expects this object to own the property "getArray" that is a function.', () => {
      expect(o).to.have.property('getArray').that.is.a('function');
    });

    it('Expects "getString" to return the string "I am a string!".', () => {
      expect(o.getString()).to.be.a('string').that.is.equal('I am a string!');
    });

    it('Expects "getArray" to return an array with 3 elements.', () => {
      expect(o.getArray()).to.be.an('array').that.has.lengthOf(3);
    });

    it('Expects the first element to be equal to 1.', () => {
      expect(o.getArray()[0]).to.be.a('number').that.is.equal(1);
    });

    it('Expects the second element to be equal to 2.', () => {
      expect(o.getArray()[1]).to.be.a('number').that.is.equal(2);
    });

    it('Expects the third element to be equal to 3.', () => {
      expect(o.getArray()[2]).to.be.a('number').that.is.equal(3);
    });
  });
});
