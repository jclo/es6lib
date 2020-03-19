/** **************************************************************************
 *
 * A ...
 *
 * functional.js is built upon the Functional Instantiation pattern. It
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
/* global Tree, root */
/* eslint-disable one-var, semi-style */

'use strict';

(function() {
  // IIFE_START


  // -- Module Path


  // -- Local Modules
  const Util = Tree.Util.Public;


  // -- Local Constants
  // Saves the previous value of the library variable, so that it can be
  // restored later on, if noConflict is used.
  const previousES6lib = root.ES6lib
      , obj = {}
      ;


  // -- Local Variables


  // -- Public ---------------------------------------------------------------

  /**
   * Returns the ES6lib object.
   * (Functional Instantiation Pattern)
   *
   * @constructor (arg1)
   * @public
   * @param {String}        the argument to be saved as an object variable,
   * @returns {Object}      returns the ES6lib object,
   * @since 0.0.0
   */
  ES6lib = function(name) {
    obj.name = name;
    return obj;
  };

  // Attaches a constant to ES6lib that provides the version of the lib.
  ES6lib.VERSION = '{{lib:version}}';


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

  /**
   * Returns a string.
   *
   * @method ()
   * @public
   * @param {}              -,
   * @returns {String}      returns a string,
   * @since 0.0.0
   */
  obj.getString = function() {
    return Util.getString();
  };

  /**
   * Returns an array.
   *
   * @method ()
   * @public
   * @param {}              -,
   * @returns {Array}       returns an array,
   * @since 0.0.0
   */
  obj.getArray = function() {
    return Util.getArray();
  };

  // IIFE_END
}());
/* eslint-enable one-var, semi-style */
