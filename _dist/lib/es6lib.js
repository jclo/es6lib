/*! ****************************************************************************
 * ES6lib v1.0.11
 *
 * A template for writing pure ES6 Javascript libraries.
 * (you can download it from npm or github repositories)
 * Copyright (c) 2021 Mobilabs <contact@mobilabs.fr> (http://www.mobilabs.fr/).
 * Released under the MIT license. You may obtain a copy of the License
 * at: http://www.opensource.org/licenses/mit-license.php).
 * Built from {{boiler:name}} v{{boiler:name:version}}.
 * ************************************************************************** */
// ESLint declarations
/* global define */
/* eslint strict: ["error", "function"] */
(function(root, factory) {
  'use strict';

  /* istanbul ignore next */
  if (typeof define === 'function' && define.amd) {
    // AMD. Register as an anonymous module.
    define([''], factory);
  } else if (typeof exports === 'object') {
    // Node. Does not work with strict CommonJS, but
    // only CommonJS-like environments that support module.exports,
    // like Node.
    /* eslint-disable-next-line no-param-reassign */
    module.exports = factory(root);
  } else {
    // Browser globals.
    /* eslint-disable-next-line no-param-reassign */
    root.ES6lib = factory(root);
  }
}(this, (root) => {
  'use strict';

  /** **************************************************************************
   * _head provides the list of the constants that are defined at the global
   * level of this module and are accessible to all. So, they are considered
   * as reserved words for this library.
   * ************************************************************************ */
  /* eslint-disable one-var, no-unused-vars, semi-style */

  let ES6lib
    , extend
    ;

  // Tree is an internal object that links all the internal modules.
  const Tree = {
    Util: {
      Public: {},
    },
  };

  /* eslint-enable one-var, no-unused-vars, semi-style */

  /** **************************************************************************
   *
   * Provides the function 'extend' that is used to fill the object tree with
   * the public static or object methods when the Javascript VM browses the
   * library from the top to the bottom.
   *
   * extend.js is just a literal object that contains a set of functions.
   * It can't be instantiated.
   *
   * Private Functions:
   *  . none,
   *
   *
   * Public Static Methods:
   *  . extend                      extends the passed-in object with new methods,
   *
   *
   *
   * @namespace    -
   * @dependencies none
   * @exports      -
   * @author       -
   * @since        0.0.0
   * @version      -
   * ************************************************************************ */
  /* - */
  /* - */

  (function() {
    // START OF IIFE


    // -- Module Path


    // -- Local Modules


    // -- Local Constants


    // -- Local Variables


    // -- Public function ------------------------------------------------------

    /**
     * Extends the passed-in object with new methods.
     *
     * Nota: this function mutates object.
     *
     * @function (arg1, arg2)
     * @private
     * @param {Object}        the object to extend,
     * @param {Object}        an object containing a set of methods,
     * @returns {}            -,
     * @since 0.0.0
     */
    extend = function(object, methods) {
      const keys = Object.keys(methods);

      for (let i = 0; i < keys.length; i++) {
        /* eslint-disable-next-line no-param-reassign */
        object[keys[i]] = methods[keys[i]];
      }
    };

    // END OF IIFE
  }());
  /* - */

  /** **************************************************************************
   *
   * A ...
   *
   * util.js is just a literal object that contains a set of functions.
   * It can't be instantiated.
   *
   * Private Functions:
   *  . _getString                  returns a string,
   *  . _getArray                   returns an array,
   *
   *
   * Public Static Methods:
   *  . getString                   returns a string,
   *  . getArray                    returns an array,
   *
   *
   *
   * @namespace    -
   * @dependencies none
   * @exports      -
   * @author       -
   * @since        0.0.0
   * @version      -
   * ************************************************************************ */
  /* - */
  /* eslint-disable no-underscore-dangle */

  (function() {
    // START OF IIFE


    // -- Module Path
    const Root = Tree.Util.Public;


    // -- Local Modules


    // -- Local Constants


    // -- Local Variables


    // -- Private Functions ----------------------------------------------------

    /**
     * Returns a string.
     *
     * @function ()
     * @private
     * @param {}              -,
     * @returns {String}      returns a string,
     * @since 0.0.0
     */
    function _getString() {
      return 'I am a string!';
    }

    /**
     * Returns an array.
     *
     * @function ()
     * @private
     * @param {}              -,
     * @returns {Array}       returns an array,
     * @since 0.0.0
     */
    function _getArray() {
      return [1, 2, 3];
    }


    // -- Public Static Methods ------------------------------------------------

    extend(Root, {

      /**
       * Returns a string.
       *
       * @method ()
       * @public
       * @param {}            -,
       * @returns {String}    returns a string,
       * @since 0.0.0
       */
      getString() {
        return _getString();
      },

      /**
       * Returns an array.
       *
       * @method ()
       * @public
       * @param {}            -,
       * @returns {Array}     returns an array,
       * @since 0.0.0
       */
      getArray() {
        return _getArray();
      },
    });

    // END OF IIFE
  }());
  /* eslint-enable no-underscore-dangle */

  /** **************************************************************************
   *
   * A ...
   *
   * prototypal.js is built upon the Prototypal Instantiation pattern. It
   * returns an object by calling its constructor. It doesn't use the new
   * keyword.
   *
   * Private Functions:
   *  . none,
   *
   *
   * Constructor:
   *  . ES6lib                      creates and returns the ES6lib object,
   *
   *
   * Private Static Methods:
   *  . _setTestMode                returns internal objects for testing purpose,
   *
   *
   * Public Static Methods:
   *  . noConflict                  returns a reference to this ES6lib object,
   *
   *
   * Public Methods:
   *  . whoami                      returns the library name and version,
   *  . getString                   returns a string,
   *  . getArray                    returns an array,
   *
   *
   *
   * @namespace    -
   * @dependencies none
   * @exports      -
   * @author       -
   * @since        0.0.0
   * @version      -
   * ************************************************************************ */
  /* - */
  /* eslint-disable one-var, semi-style, no-underscore-dangle */

  (function() {
    // START OF IIFE


    // -- Module Path


    // -- Local Modules
    const Util = Tree.Util.Public;


    // -- Local Constants
    // Saves the previous value of the library variable, so that it can be
    // restored later on, if noConflict is used.
    const previousES6lib = root.ES6lib
        ;


    // -- Local Variables
    let methods
      ;


    // -- Public ---------------------------------------------------------------

    /**
     * Returns the ES6lib object.
     * (Prototypal Instantiation Pattern)
     *
     * @constructor ()
     * @public
     * @param {}              -,
     * @returns {Object}      returns the ES6lib object,
     * @since 0.0.0
     */
    ES6lib = function() {
      const obj = Object.create(methods);
      obj._library = {
        name: 'ES6lib',
        version: '1.0.11',
      };
      return obj;
    };

    // Attaches constants to ES6lib that provide name and version of the lib.
    ES6lib.NAME = 'ES6lib';
    ES6lib.VERSION = '1.0.11';


    // -- Private Static Methods -----------------------------------------------

    /**
     * Returns the internal objects for testing purpose.
     * (must not be deleted)
     *
     * @method ()
     * @private
     * @param {}              -,
     * @returns {Object}      returns a list of internal objects,
     * @since 0.0.0
     */
    ES6lib._setTestMode = function() {
      return [];
    };


    // -- Public Static Methods ------------------------------------------------

    /**
     * Returns a reference to this ES6lib object.
     * (must not be deleted)
     *
     * Nota:
     * Running ES6lib in noConflict mode, returns the ES6lib variable to
     * its previous owner.
     *
     * @method ()
     * @public
     * @param {}              -,
     * @returns {Object}      returns the ES6lib object,
     * @since 0.0.0
     */
    ES6lib.noConflict = function() {
      /* eslint-disable-next-line no-param-reassign */
      root.ES6lib = previousES6lib;
      return this;
    };


    // -- Public Methods -------------------------------------------------------

    methods = {

      /**
       * Returns the library name and version.
       * (must not be deleted)
       *
       * @method ()
       * @public
       * @param {}            -,
       * @returns {Object}    returns the library name and version,
       * @since 0.0.0
       */
      whoami() {
        return this._library;
      },

      /**
       * Returns a string.
       * (must be deleted)
       *
       * @method ()
       * @public
       * @param {}            -,
       * @returns {String}    returns a string,
       * @since 0.0.0
       */
      getString() {
        return Util.getString();
      },

      /**
       * Returns an array.
       * (must be deleted)
       *
       * @method ()
       * @public
       * @param {}            -,
       * @returns {Array}     returns an array,
       * @since 0.0.0
       */
      getArray() {
        return Util.getArray();
      },
    };

    // END OF IIFE
  }());
  /* eslint-enable one-var, semi-style, no-underscore-dangle */

  // Returns the library name:
  return ES6lib;
}));
