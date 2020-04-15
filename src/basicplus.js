/** **************************************************************************
 *
 * A ...
 *
 * basicplus.js is based on a variation of the basic.js pattern. The
 * properties are added dynamically. Thus, it can be divided in several
 * chunks of properties and the build can produces several versions of the
 * library by including or not some chunks.
 *
 * Private Functions:
 *  . none,
 *
 *
 * Private Static Methods:
 *  . _setTestMode                returns internal objects for testing purpose,
 *
 *
 * Public Static Methods:
 *  . noConflict                  returns a reference to this ES6lib object,
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
/* global Tree, root, extend */
/* eslint-disable one-var, semi-style, no-underscore-dangle */

'use strict';

(function() {
  // START OF IIFE


  // -- Module Path


  // -- Local Modules
  const Util = Tree.Util.Public;


  // -- Local Constants
  // Saves the previous value of the library variable, so that it can be
  // restored later on, if noConflict is used.
  const previousES6lib = root.ES6lib;


  // -- Local Variables


  // -- Public ---------------------------------------------------------------

  ES6lib = {

    // Useful to retrieve the library name and version when it is
    // embedded in another library as an object:
    library: { name: '{{lib:name}}', version: '{{lib:version}}' },


    // -- Private Static Methods ---------------------------------------------

    /**
     * Returns the internal objects for testing purpose.
     *
     * @method ()
     * @private
     * @param {}            -,
     * @returns {Object}    returns a list of internal objects,
     * @since 0.0.0
     */
    _setTestMode() {
      return [];
    },


    // -- Public Static Methods ----------------------------------------------

    /**
     * Returns a reference to this ES6lib object.
     *
     * Nota:
     * Running ES6lib in noConflict mode, returns the ES6lib variable to its
     * _ previous owner.
     *
     * @function ()
     * @public
     * @param {}            -,
     * @returns {Object}    returns the ES6lib object,
     * @since 0.0.0
     */
    /* istanbul ignore next */
    noConflict() {
      /* eslint-disable-next-line no-param-reassign */
      root.ES6lib = previousES6lib;
      return this;
    },
  };

  // Attaches a constant to ES6lib that provides the version of the lib.
  ES6lib.VERSION = '{{lib:version}}';


  // Extends ES6lib with new static methods.
  extend(ES6lib, {

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
      return Util.getString();
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
      return Util.getArray();
    },
  });

  // END OF IIFE
}());
/* eslint-enable one-var, semi-style, no-underscore-dangle */
