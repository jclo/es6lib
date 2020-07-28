# ES6lib

[![NPM version][npm-image]][npm-url]
[![Travis CI][travis-image]][travis-url]
[![Test coverage][coveralls-image]][coveralls-url]
[![Dependencies status][dependencies-image]][dependencies-url]
[![Dev Dependencies status][devdependencies-image]][devdependencies-url]
[![License][license-image]](LICENSE.md)
<!--- [![node version][node-image]][node-url] -->

[![NPM install][npm-install-image]][npm-install-url]

ES6lib is a template for writing ES6 Javascript libraries and ES6 modules that run on both Node.js and ECMAScript 2015 (ES6) compliant browsers.

The ES6lib build produces two libraries:

  * a library packaged in an UMD module that could be used on both the browser and Node.js,
  * a library packaged as an ES6 module that can be imported with the keyword `import` (import ES6lib from '../../es6lib.mjs').

This template does not include a transpiler like babel or a module bundler like browserify/webpack or rollup. It relies on Gulp to build your library from the source files. Thus, it keeps your library pure (without extra code due to the transpiler or the module bundler).

This template is useful if your library is intended to run on ECMAScript 2015 (ES6) compliant browser.

ES6lib relies on [Mocha](https://mochajs.org) and [Chai](http://chaijs.com) for unitary testing. It relies on [Istanbul](https://gotwarlost.github.io/istanbul/) for code coverage.

ES6lib uses [Travis CI](https://travis-ci.org) for continuous integration and [Coveralls.io](https://coveralls.io) to display test coverage.


## Quick Startup

You can easily get your first ES6Lib library running in a couple of minutes by just typing a few command lines. But first, you need to create an empty folder. It will contain your library.

Then, you have to install the `es6lib` package globally. Open a terminal session and type the command line:

```bash
npm install es6lib -g
```

Or, if you don't have the rights to install es6lib globally, you can install it locally in your project. Open a terminal session, move to your working directory - the empty folder you created - and type the following command line:

```bash
npm install es6lib
```

Now populate your empty folder and create your first UMD library:

```bash
// populate
es6lib populate -n myapp
// Or, if you installed the package locally:
./node_modules/.bin/es6lib populate -n myapp
// Install Node.js packages
npm install
```

Now your folder contains the following files:

```bash
Your project Folder
      |_ lib
      |   |_ lib.js            // Your built ES6 UMD library,
      |   |_ lib.mjs           // Your built ES6 Module,   
      |_ src
      |   |_ _footer           // The UMD footer,
      |   |_ _header           // The UMD header,
      |   |_ ...               // The core or your library,
      |_ tasks
      |   |_ ...              // The Gulp tasks to build your project,
      |_  test
      |     |_ main.js        // Your Mocha, Chai test file,
      |_ .eslintignore        // Files to be ignored by ESLint,
      |_ .eslintrc            // A Configuration file for the ESLint linter tool (if you use it),
      |_ .gitignore           // Files that Git must ignore (if you use git),
      |_ .npmignore           // Files that are ignored by npm publish,
      |_ .travis.yml          // A configuration file for Travis CI (if you use it),
      |_ .CHANGELOG.md        // The changes between your different versions,
      |_ .gulpfile.js         // The main Gulp task,
      |_ index.js             // The link to your ES5 library,
      |_ LICENSE.md           // The license that applies to your library (here MIT),
      |_ package-lock.json    // The NPM dependency tree,
      |_ package.json         // The NPM package file,
      |_ README.md            // Your README file,
```

This folder is now a NPM package.


## How to build it

The file `gulpfile.js` contains the build instructions. These instructions populate the folder `lib` from the sources files included in the folder `src`.

`gulpfile.js` implements two operations for the build:
  * the command `npm run build` creates the library at the execution,
  * and the command `npm run watch` updates the library when one of the source files is modified.


## How to test it

Your `package.json` file contains three scripts to test your UMD library:

  * `npm run test`,
  * `npm run check-coverage`,
  * `npm run display-coverage`.

`npm run test` executes the tests and computes the test coverage.

`npm run check-coverage` checks if the test coverage matches the requirements. Here 100%.

`npm run display-coverage` opens your browser and reports the test coverage.


## How to create a distribution version

Your `package.json` file contains a script to build a distribution library:

  * `npm run makedist`

The script `makedist` adds a license header to the library and creates a minified version.


## How to use it

On Node.js, your project folder is viewed as a NPM package. Choose a working directory outside your project folder, create a folder `node_modules` and copy your project folder into `node_modules`. Then, on your terminal, type (at your working directory level):

```js
node
> var mylib = require('mylib');
undefined
> mylib.getString();
'I am a string!'
> mylib.getArray();
[ '1', '2', '3' ]
>
```

On the browser, pick-up the JS file `lib/mylib.js` and add it as a script in your HTML file. `mylib` is an immediately-invoked function expression. It attaches the `mylib` variable to the current context.

```html
<!DOCTYPE html>
<html>
  <body>
    <script src="mylib.js"></script>
    <script>
    	console.log(mylib.VERSION);
    </script>
  </body>
</html>
```

Or,

```html
<!DOCTYPE html>
<html>
  <body>
    <script type="module">
      import mylib from './<path_to_the_lib>/mylib.mjs';

      console.log(mylib.VERSION);
    </script>
  </body>
</html>
```

Enjoy!

## License

[MIT](LICENSE.md).

<!--- URls -->

[npm-image]: https://img.shields.io/npm/v/@mobilabs/es6lib.svg?style=flat-square
[npm-install-image]: https://nodei.co/npm/@mobilabs/es6lib.png?compact=true
[node-image]: https://img.shields.io/badge/node.js-%3E=_0.10-green.svg?style=flat-square
[download-image]: https://img.shields.io/npm/dm/@mobilabs/es6lib.svg?style=flat-square
[travis-image]: https://img.shields.io/travis/jclo/es6lib.svg?style=flat-square
[coveralls-image]: https://img.shields.io/coveralls/jclo/es6lib/master.svg?style=flat-square
[dependencies-image]: https://david-dm.org/jclo/es6lib/status.svg?theme=shields.io
[devdependencies-image]: https://david-dm.org/jclo/es6lib/dev-status.svg?theme=shields.io
[license-image]: https://img.shields.io/npm/l/@mobilabs/es6lib.svg?style=flat-square

[npm-url]: https://www.npmjs.com/package/@mobilabs/es6lib
[npm-install-url]: https://nodei.co/npm/@mobilabs/es6lib
[node-url]: http://nodejs.org/download
[download-url]: https://www.npmjs.com/package/@mobilabs/es6lib
[travis-url]: https://travis-ci.org/jclo/es6lib
[coveralls-url]: https://coveralls.io/github/jclo/es6lib?branch=master
[dependencies-url]: https://david-dm.org/jclo/es6lib
[devdependencies-url]: https://david-dm.org/jclo/es6lib?type=dev
[license-url]: http://opensource.org/licenses/MIT
