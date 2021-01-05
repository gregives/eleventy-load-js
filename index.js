const path = require("path");
const webpack = require("webpack");
const { fs } = require("memfs");

const ENTRY = "main.js";

module.exports = function (_content, options) {
  const context = path.resolve(this.config.inputDir);
  const compiler = webpack({
    context,
    mode: "production",
    entry: [path.resolve(context, this.resourcePath)],
    output: {
      path: path.resolve(),
      filename: ENTRY,
    },
    ...options,
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
