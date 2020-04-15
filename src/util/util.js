/** **************************************************************************
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
 * @namespace    -
 * @dependencies none
 * @exports      -
 * @author       -
 * @since        0.0.0
 * @version      -
 * ************************************************************************ */
/* global Tree, extend */
/* eslint-disable no-underscore-dangle */

'use strict';

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
