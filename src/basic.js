/** **************************************************************************
 *
 * A ...
 *
 * basic.js is just a literal object that contains a set of functions. It
 * can't be intantiated.
 *
 * Private Functions:
 *  . none,
 *
 *
 * Public Static Methods:
 *  . noConflict                  returns a reference to this ES6lib object,
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
/* - */

'use strict';

(function() {
  // IIFE_START

  // -- Module path


  // -- Local modules
  const Util = Tree.Util.Public;


  // -- Local constants
  // Saves the previous value of the library variable, so that it can be
  // restored later on, if noConflict is used.
  const previousES6lib = root.ES6lib;


  // -- Local variables


  // -- Public Static Methods ------------------------------------------------

  ES6lib = {

    /**
     * Returns a reference to this ES6lib object.
     *
     * Nota:
     * Running ES6lib in noConflic mode, returns the ES6lib variable to its
     * _ previous owner.
     *
     * @method ()
     * @public
     * @param {}            -,
     * @returns {String}    returns the ES6lib object,
     * @since 0.0.0
     */
    /* istanbul ignore next */
    noConflict() {
      /* eslint-disable-next-line no-param-reassign */
      root.ES6lib = previousES6lib;
      return this;
    },

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

  // Attaches a constant to ES6lib that provides the version of the lib.
  ES6lib.VERSION = '{{lib:version}}';

  // IIFE_END
}());
/* - */
