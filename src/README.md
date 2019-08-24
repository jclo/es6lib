# Patterns

This folder offers several patterns to build your library. Choose the best pattern for your needs:

  * `basic.js` returns a literal object including a list of functions,
  * `functional.js` instantiates an object with a set of methods,
  * `functional-shared.js` instantiates an object with a set of shared methods,
  * `prototypal.js` instantiates an object with prototypal methods,
  * `pseudoclassical.js` instantiates with the keyword `new` an object with prototypal methods,
  * `pseudoclassical-auto.js` instantiates without the keyword `new` an object with prototypal methods,


## How to build

Select in the file `tasks/config.js` the pattern you want to include in your library, then run `npm run build`.


## How to test

First, you need to delete the file `tests/main.js`.

Then, run:

  * `npm run test ./test/basic.js` for the `basic` pattern,
  * `npm run test /test/pseudoclassical.js` for the `pseudoclassical Instantiation Pattern`,
  * `npm run test ./test/functional.js` for all the others,


## Default

By default, the `functional-shared` pattern is active.
