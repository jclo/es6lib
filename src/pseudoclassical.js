/** **************************************************************************
 *
 * A ...
 *
 * pseudoclassical.js is built upon the Pseudoclassical Instantiation pattern.
 * It returns an object by calling its constructor with the new
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
/* global Tree, root */
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
  const previousES6lib = root.ES6lib
      ;


  // -- Local Variables


  // -- Public ---------------------------------------------------------------

  /**
   * Returns the ES6lib object.
   * (Pseudoclassical Instantiation Pattern)
   *
   * @constructor (arg1)
   * @public
   * @param {String}        the argument to be saved as an object variable,
   * @returns {Object}      returns the ES6lib object,
   * @since 0.0.0
   */
  ES6lib = function(name) {
    if (!(this instanceof ES6lib)) {
      throw new Error('ES6lib needs to be called with the new keyword!');
    }
    this.library = {
      name: '{{lib:name}}',
      version: '{{lib:version}}',
    };
    this.name = name;
  };

  // Attaches a constant to ES6lib that provides the version of the lib.
  ES6lib.VERSION = '{{lib:version}}';


  // -- Private Static Methods -----------------------------------------------

  /**
   * Returns the internal objects for testing purpose.
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
   *
   * Nota:
   * Running ES6lib in noConflict mode, returns the ES6lib variable to its
   * _ previous owner.
   *
   * @method ()
   * @public
   * @param {}              -,
   * @returns {Object}      returns the ES6lib object,
   * @since 0.0.0
   */
  /* istanbul ignore next */
  ES6lib.noConflict = function() {
    /* eslint-disable-next-line no-param-reassign */
    root.ES6lib = previousES6lib;
    return this;
  };


  // -- Public Methods -------------------------------------------------------

  ES6lib.prototype = {

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
  };

  // END OF IIFE
}());
/* eslint-enable one-var, semi-style, no-underscore-dangle */
