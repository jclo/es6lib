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
/* global */
/* - */

'use strict';

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
