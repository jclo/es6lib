# ES6lib

[![NPM version][npm-image]][npm-url]
[![GitHub last commit][commit-image]][commit-url]
[![Github workflow][ci-image]][ci-url]
[![Test coverage][coveralls-image]][coveralls-url]
[![npm bundle size][npm-bundle-size-image]][npm-bundle-size-url]
[![License][license-image]](LICENSE.md)

ES6lib is a template for writing ES6 Javascript libraries and ES6 modules that run on both Node.js and ECMAScript 2015 (ES6) compliant browsers.

The ES6lib build produces two libraries:

  * a library packaged in an UMD module that could be used on both the browser and Node.js,
  * a library packaged as an ES6 module that can be imported with the keyword `import` (import ES6lib from '../../es6lib.mjs').

This template does not include a transpiler like babel or a module bundler like browserify/webpack or rollup. It relies on Npm scripts to build your library from the source files. Thus, it keeps your library pure (without extra code due to the transpiler or the module bundler).

This template is useful if your library is intended to run on ECMAScript 2015 (ES6) compliant browser and it is made of just a few files.

ES6lib relies on [Mocha](https://mochajs.org) and [Chai](http://chaijs.com) for unitary testing. It relies on [Istanbul](https://gotwarlost.github.io/istanbul/) for code coverage.

ES6lib uses [Github Actions](https://docs.github.com/en/actions) for continuous integration and [Coveralls.io](https://coveralls.io) to display test coverage.


## Quick Startup

You can easily get your first ES6Lib library running in a couple of minutes by just typing a few command lines. But first, you need to create an empty folder. It will contain your library.

Then, you just need to create a `package.json` file that contains:

```json
{
  "name": "NameOfYourProject",
  "scripts": {
    "create": "npm install @mobilabs/es6lib && npm run populate",
    "populate": "es6lib populate --name $npm_package_name --author $npm_package_config_name --acronym $npm_package_config_acronym --email $npm_package_config_email --url $npm_package_config_url && npm install && npm run build:dev && npm run test && npm run report"
  },
  "config": {
    "name": "John Doe",
    "acronym": "jdo",
    "email": "jdo@johndoe.com",
    "url": "http://www.johndoe.com/"
  }
}
```
Replace `NameOfYourProject` by your project name and fill `writer` with your credentials.

And finally, type in the terminal:

```bash
npm run create.
```

That's almost all! When the script has been executed, your folder contains the following files:

```bash
Your project Folder
      |_ .github
      |     |_ workflows
      |           |_ ci.yml    // Github Workflow file (if you use it),
      |_ lib
      |   |_ lib.js            // Your built ES6 UMD library,
      |   |_ lib.mjs           // Your built ES6 Module,
      |_ scripts
      |   |_ ...              // The scripts to build your project,
      |_ src
      |   |_ _footer           // The UMD footer,
      |   |_ _header           // The UMD header,
      |   |_ ...               // The core or your library,
      |_  test
      |     |_ main.js        // Your Mocha, Chai test file,
      |_ .eslintignore        // Files to be ignored by ESLint,
      |_ .eslintrc            // A Configuration file for the ESLint linter tool (if you use it),
      |_ .gitignore           // Files that Git must ignore (if you use git),
      |_ .npmignore           // Files that are ignored by npm publish,
      |_ .CHANGELOG.md        // The changes between your different versions,
      |_ index.js             // The link to your ES5 library,
      |_ LICENSE.md           // The license that applies to your library (here MIT),
      |_ package-lock.json    // The NPM dependency tree,
      |_ package.json         // The NPM package file,
      |_ README.md            // Your README file,
```

This folder is now a NPM package.


## How to build it

The file `package.json` contains the build instructions. These instructions populate the folder `lib` from the sources files included in the folder `src`.

`package.json` implements two operations for the build:
  * the command `npm run build:dev` creates the library at the execution,
  * and the command `npm run watch` updates the library when one of the source files is modified.


## How to test it

Your `package.json` file contains three scripts to test your UMD library:

  * `npm run test`,
  * `npm run check:coverage`,
  * `npm run display:coverage`.

`npm run test` executes the tests and computes the test coverage.

`npm run check:coverage` checks if the test coverage matches the requirements. Here 100%.

`npm run display:coverage` opens your browser and reports the test coverage.


## How to create a distribution version

Your `package.json` file contains a script to build a distribution library:

  * `npm run build:prod`

The script `build:prod` adds a license header to the library and creates a minified version.


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
    <script src="./<path_to_the_lib>/mylib.js"></script>
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

[npm-image]: https://img.shields.io/npm/v/@mobilabs/es6lib.svg?logo=npm&logoColor=fff&label=NPM+package
[release-image]: https://img.shields.io/github/release/jclo/es6lib.svg?include_prereleases
[commit-image]: https://img.shields.io/github/last-commit/jclo/es6lib.svg?logo=github
[ci-image]: https://github.com/jclo/es6lib/actions/workflows/ci.yml/badge.svg
[coveralls-image]: https://img.shields.io/coveralls/jclo/es6lib/master.svg?&logo=coveralls
[npm-bundle-size-image]: https://img.shields.io/bundlephobia/minzip/@mobilabs/es6lib.svg
[license-image]: https://img.shields.io/npm/l/@mobilabs/es6lib.svg

[npm-url]: https://www.npmjs.com/package/@mobilabs/es6lib
[release-url]: https://github.com/jclo/es6lib/tags
[commit-url]: https://github.com/jclo/es6lib/commits/master
[ci-url]: https://github.com/jclo/es6lib/actions/workflows/ci.yml
[coveralls-url]: https://coveralls.io/github/jclo/es6lib?branch=master
[npm-bundle-size-url]: https://img.shields.io/bundlephobia/minzip/@mobilabs/es6lib
[license-url]: http://opensource.org/licenses/MIT
