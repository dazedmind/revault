/*
Copyright (c) 2012, Guillaume Marty

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.
 */

'use strict'

/**
 * Generate a replacing function given a table of patterns. Inspired by:
 * http://code.google.com/p/jslibs/wiki/JavascriptTips#String_converter
 * The order of elements is significant. Longer elements should be listed first.
 * @see Speed test http://jsperf.com/build-a-regexp-table
 *
 * @param {Object.<string, string>} translationTable The translation table of key value.
 * @return {function(string): string} A translating function.
 */
function replacer (translationTable) {
  /**
   * An array of translationTable keys.
   * @type {Array.<string>}
   */
  const pattern = []

  /**
   * Used to iterate over translationTable.
   * @type {string}
   */
  let key

  for (key in translationTable) {
    // Escaping regexp special chars.
    // @see Speed test for type casting to string http://jsperf.com/string-type-casting/2
    // @see http://closure-library.googlecode.com/svn/docs/closure_goog_string_string.js.source.html#line956
    const key1 = ('' + key).replace(/([-()[\]{}+?*.$^|,:#<!\\/])/g, '\\$1')
      .replace(/\x08/g, '\\x08')

    pattern.push(key1)
  }

  /**
   * The regular expression doing the replacement job.
   * @type {RegExp}
   */
  const regExp = new RegExp(pattern.join('|'), 'g')

  /**
   * @param {string} str Input string.
   * @return {string} The string replaced.
   */
  return function (str) {
    return str.replace(regExp, function (str) {
      return translationTable[str]
    })
  }
}

/**
 * Exchanges all keys with their associated values in an object.
 *
 * @param {Object.<string, string>} obj An object of strings.
 * @return {Object.<string, string>} An object of strings.
 */
function flip (obj) {
  const newObj = Object.create(null)
  let key

  for (key in obj) {
    newObj[obj[key]] = key
  }

  return newObj
}

/**
 * Merge several objects. Properties from earlier objects are overwritten by
 * laters's in case of conflict.
 *
 * @param {...Object.<string, string>} var_args One or more objects of strings.
 * @return {!Object.<string, string>} An object of strings.
 */
function merge (varArgs) {
  const args = [].slice.call(arguments)
  const newObj = Object.create(null)
  let id = 0; let key

  while (args[id]) {
    for (key in args[id]) {
      newObj[key] = args[id][key]
    }

    id++
  }

  return newObj
}

exports.replacer = replacer
exports.flip = flip
exports.merge = merge
