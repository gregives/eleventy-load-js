const path = require("path");
const webpack = require("webpack");
const { fs } = require("memfs");

const ENTRY = "main.js";

module.exports = function (_content, options = {}) {
  const compiler = webpack({
    context: path.resolve(this.config.dir.input),
    mode: "production",
    entry: [this.resource],
    output: {
      path: path.resolve(),
      filename: ENTRY,
    },
  });

  compiler.outputFileSystem = fs;

  return new Promise((resolve, reject) => {
    compiler.run((err, stats) => {
      if (err || stats.hasErrors())
        reject(err || new Error(stats.compilation.errors));

      resolve(fs.readFileSync(path.resolve(ENTRY)));
    });
  });
};
