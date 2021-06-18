# eleventy-load-js

[![npm version][npm-version-src]][npm-version-href]
[![npm downloads][npm-downloads-src]][npm-downloads-href]
[![License][license-src]][license-href]
[![Prettier][prettier-src]][prettier-href]

Bundle and minify JavaScript with webpack using [eleventy-load](https://github.com/gregives/eleventy-load).

## Getting Started

Firstly, you'll need to install [eleventy-load](https://github.com/gregives/eleventy-load) (if you haven't already) and eleventy-load-js. You'll probably want to use eleventy-load-js in combination with [eleventy-load-html](https://github.com/gregives/eleventy-load-html) and [eleventy-load-file](https://github.com/gregives/eleventy-load-file), so we'll install those as well. The latter writes the output of eleventy-load-js to a file which will be saved inEleventy's output directory, which is the behavior you often want for JavaScript.

```sh
npm install --save-dev eleventy-load eleventy-load-js eleventy-load-html eleventey-load-file
```

Then you can set up eleventy-load-js using a rule in your eleventy-load options.

```js
module.exports = function (eleventyConfig) {
  eleventyConfig.addPlugin(require("eleventy-load"), {
    rules: [
      {
        test: /\.html$/,
        loaders: [
          {
            loader: require("eleventy-load-html"),
          },
        ],
      },
      {
        test: /\.js$/,
        loaders: [
          {
            loader: require("eleventy-load-js"),
            options: {
              mode: "production",
            },
          },
          {
            loader: require("eleventy-load-file"),
          },
        ],
      },
    ],
  });
};
```

## Options

| Name                   | Type     | Default   | Description         |
| ---------------------- | -------- | --------- | ------------------- |
| [**`webpack`**](#name) | `Object` | See below | Options for webpack |

### `webpack`

Type: `Object`

Pass options to the webpack configuration. By default, eleventy-load-js is configured to use the project's input directory as the webpack context and uses an in-memory file system for webpack's output.

```js
{
  context: path.resolve(this.config.inputDir),
  entry: [path.resolve(this.config.inputDir, this.resourcePath)],
  mode: "production",
}
```

<!-- References -->

[npm-version-src]: https://img.shields.io/npm/v/eleventy-load-js/latest.svg
[npm-version-href]: https://npmjs.com/package/eleventy-load-js
[npm-downloads-src]: https://img.shields.io/npm/dt/eleventy-load-js.svg
[npm-downloads-href]: https://npmjs.com/package/eleventy-load-js
[license-src]: https://img.shields.io/npm/l/eleventy-load-js.svg
[license-href]: https://npmjs.com/package/eleventy-load-js
[prettier-src]: https://img.shields.io/badge/code_style-prettier-ff69b4.svg
[prettier-href]: https://github.com/prettier/prettier
