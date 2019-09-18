/* ***************************************************************************
 *
 * A ...
 *
 * pseudoclassical-auto.js is built upon a variation of the Pseudoclassical
 * Instantiation pattern. The object is instantiated by the new keyword
 * included in the constructor. The caller just needs to call the
 * constructor without the new keyword to get in return the object.
 *
 * Private Functions:
 *  . none,
 *
 *
 * Constructor:
 *  . ES6lib                      creates and returns the ES6lib object,
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
 * @namespace    ES6lib
 * @dependencies none
 * @exports      -
 * @author       -
 * @since        0.0.0
 * @version      -
 * ************************************************************************ */
/* eslint-disable one-var, semi-style */

'use strict';

(function() {
  // IIFE

  // -- Module path


  // -- Local modules
  const Util = Tree.Util.Public;


  // -- Local constants
  // Saves the previous value of the library variable, so that it can be
  // restored later on, if noConflict is used.
  const previousES6lib = root.ES6lib
      ;


  // -- Local variables


  // -- Public ---------------------------------------------------------------

  /**
   * Returns the ES6lib object.
   * (Pseudoclassical Instantation Pattern with auto instantatiation - no need for new)
   *
   * @constructor (arg1)
   * @public
   * @param {String}        the argument to be saved as an object variable,
   * @returns {Object}      returns the ES6lib object,
   * @since 0.0.0
   */
  ES6lib = function(name) {
    if (this instanceof ES6lib) {
      this.name = name;
    } else {
      return new ES6lib(name);
    }
    return null;
  };

  // Attaches a constant to ES6lib that provides the version of the lib.
  ES6lib.VERSION = '{{lib:version}}';


  // -- Public Static Methods ------------------------------------------------

  /**
   * Returns a reference to this ES6lib object.
   *
   * Nota:
   * Running ES6lib in noConflict mode, returns the ES6lib variable to its
   * previous owner.
   *
   * @method ()
   * @public
   * @param {}              -,
   * @returns {String}      returns the ES6lib object,
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
}());
