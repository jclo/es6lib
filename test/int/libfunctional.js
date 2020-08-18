// ESLint declarations:
/* global describe, it */
/* eslint one-var: 0, semi-style: 0, no-underscore-dangle: 0 */

'use strict';

// -- Vendor Modules
const { expect } = require('chai')
    ;


// -- Local Modules


// -- Local Constants


// -- Local Variables


// -- Main
module.exports = function(ES6lib, libname, version) {
  describe('Test ES6lib Library:', () => {
    describe('Test ES6lib.NAME and ES6lib.VERSION:', () => {
      it(`Expects ES6lib.NAME to return the string "${libname}".`, () => {
        expect(ES6lib.NAME).to.be.a('string').that.is.equal(libname);
      });

      it(`Expects ES6lib.VERSION to return the string "${version}".`, () => {
        expect(ES6lib.VERSION).to.be.a('string').that.is.equal(version);
      });
    });

    describe('Test ES6lib private static methods:', () => {
      it('Expects ES6lib._setTestMode to be a function.', () => {
        expect(ES6lib).own.property('_setTestMode').that.is.a('function');
      });

      it('Expects ES6lib._setTestMode() to return an empty array.', () => {
        expect(ES6lib._setTestMode()).to.be.an('array').that.has.lengthOf(0);
      });
    });

    describe('Test ES6lib public static methods::', () => {
      it('Expects ES6lib.noConflict to be a function.', () => {
        expect(ES6lib).to.own.property('noConflict').that.is.a('function');
      });

      it('Expects ES6lib.noConflict() to return a function.', () => {
        expect(ES6lib.noConflict()).to.be.a('function');
      });
    });

    describe('Test ES6lib constructor and generic public methods:', () => {
      const o = ES6lib();
      const op = Object.getOwnPropertyNames(o);

      it('Expects ES6lib() to return an object.', () => {
        expect(o).to.be.an('object');
      });

      it('Expects this object to own 5 properties.', () => {
        expect(op).to.be.an('array').that.has.lengthOf(5);
      });

      it('Expects this object to own the property "whoami" that is a function.', () => {
        expect(o).to.own.property('whoami').that.is.a('function');
      });

      it('Expects ES6lib.whoami() to return an object.', () => {
        expect(o.whoami()).to.be.an('object');
      });

      it('Expects this object to own two properties.', () => {
        expect(Object.keys(o.whoami())).to.be.an('array').that.has.lengthOf(2);
      });

      it('Expects this object to own the property "name".', () => {
        expect(o.whoami()).to.own.property('name').that.is.equal(libname);
      });

      it('Expects this object to own the property "version".', () => {
        expect(o.whoami()).to.own.property('version').that.is.equal(version);
      });
    });

    describe('Test ES6lib specific public methods:', () => {
      const o = ES6lib();

      it('Expects this object to own the property "getString" that is a function.', () => {
        expect(o).to.own.property('getString').that.is.a('function');
      });

      it('Expects this object to own the property "getArray" that is a function.', () => {
        expect(o).to.own.property('getArray').that.is.a('function');
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
};