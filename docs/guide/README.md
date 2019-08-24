# Guide

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
./node_modules/es6lib/bin/eslib.js populate -n myapp
// Install Node.js packages
npm install
```

Now your folder contains the following files:

```bash
Your project Folder
      |_ docs                 // The VuePress documentation of your project,
      |_ lib
      |   |_ lib.js           // Your built ES6 module,
      |_ src
      |   |_ _footer           // The UMD footer,
      |   |_ _header           // The UMD header,
      |   |_ ...               // The core or your library,
      |_ tasks
      |   |_ ...              // The Gulp tasks to build your project,
      |_  test
      |     |_ main.js        // Your Mocha, Chai test file,
      |_ .eslintrc            // A Configuration file for the ESLint linter tool (if you use it),
      |_ .gitignore           // Files that Git must ignore (if you use git),
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
> var mylib = require('toto');
undefined
> mylib.getString();
'I am a string!'
> mylib.getArray();
[ '1', '2', '3' ]
>
```

On the browser, pick-up the JS file `lib/es6lib.js` and add it as a script in your HTML file. `es6lib` is an immediately-invoked function expression. It attaches the `ES6lib` variable to the current context.

```html
<!DOCTYPE html>
<html>
  <body>
    <script src="es6lib.js"></script>
    <script>
    	console.log(ES6Lib.VERSION);
    </script>
  </body>
</html>
```

Enjoy!
