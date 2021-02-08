const path = require("path");
const webpack = require("webpack");
const { fs } = require("memfs");

const ENTRY = "main.js";

module.exports = function (_content, _options = {}) {
  const options = {
    webpack: {
      mode: "production",
    },
    ..._options,
  };

  const compiler = webpack({
    context: path.resolve(this.config.inputDir),
    entry: [path.resolve(this.config.inputDir, this.resourcePath)],
    output: {
      path: path.resolve(),
      filename: ENTRY,
    },
    ...options.webpack,
  });

  compiler.outputFileSystem = fs;

  return new Promise((resolve, reject) => {
    compiler.run((err, stats) => {
      if (err || stats.hasErrors()) {
        reject(err || new Error(stats.compilation.errors));
        return;
      }

      resolve(fs.readFileSync(path.resolve(ENTRY)));
    });
  });
};
