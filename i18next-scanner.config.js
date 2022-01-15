var fs = require("fs");
var chalk = require("chalk");
const path = require("path");

module.exports = {
  input: [
    "src/**/*.{js,jsx}",
    // Use ! to filter out files or directories
    "!src/**/*.spec.{js,jsx}",
    "!src/i18n/**",
    "!**/node_modules/**",
  ],
  options: {
    debug: true,
    removeUnusedKeys: true,
    lngs: [
      "en",
      /*
            'de',
            'fr',
            'it'
            */
    ],
    func: {
      list: ["i18next.t", "i18n.t", "t"],
      extensions: [".js", ".jsx"],
    },
    trans: {
      component: "I18n",
      i18nKey: "i18nKey",
      extensions: [".js", ".jsx"],
      fallbackKey: function (ns, value) {
        return value;
      },
    },
    ns: ["translation"],
    defaultLng: "en",
    defaultNs: "translation",
    resource: {
      loadPath: path.join(__dirname, "/src/i18n/{{lng}}/{{ns}}.json"),
      savePath: path.join(__dirname, "/src/i18n/{{lng}}/{{ns}}.json"),
      jsonIndent: 2,
      lineEnding: "\n",
    },
    nsSeparator: false, // namespace separator
    keySeparator: ".", // key separator
    interpolation: {
      prefix: "{{",
      suffix: "}}",
    },
  },
  transform: function customTransform(file, enc, done) {
    "use strict";
    const parser = this.parser;
    const content = fs.readFileSync(file.path, enc);
    let count = 0;

    parser.parseFuncFromString(
      content,
      { list: ["i18next._", "i18next.__", "t"] },
      (key, options) => {
        parser.set(
          key,
          Object.assign({}, options, {
            nsSeparator: false,
            keySeparator: ".",
          })
        );
        ++count;
      }
    );

    if (count > 0) {
      console.log(
        `i18next-scanner: count=${chalk.cyan(count)}, file=${chalk.yellow(
          JSON.stringify(file.relative)
        )}`
      );
    }

    done();
  },
};
