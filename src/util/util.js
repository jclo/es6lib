/* ***************************************************************************
 *
 * A ...
 *
 * util.js is just a literal object that contains a set of functions. It
 * can't be intantiated.
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
 * @namespace    Tree.Util.Public
 * @dependencies none
 * @exports      -
 * @author       -
 * @since        0.0.0
 * @version      -
 * ************************************************************************ */
/* eslint-disable no-underscore-dangle */

'use strict';

(function() {
  // IIFE

  // -- Module path
  const Root = Tree.Util.Public;


  // -- Local modules


  // -- Local constants


  // -- Local variables


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
}());
/* eslint-enable no-underscore-dangle */
