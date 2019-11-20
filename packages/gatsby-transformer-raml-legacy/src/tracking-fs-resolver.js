// this is an extended version of the standard filesystem resolver of the raml-js-parser.
// it adds the capability to track the loaded paths in a metadata structure to be able to later know what file was included
// by what Api spec.  This allows to hot-reload the actual Api when an included fragment has changed.

// Orginal source:
// https://github.com/raml-org/raml-js-parser-2/blob/3a98270211461905ab11dbd5a59b6326b71cc9af/src/parser/jsyaml/jsyaml2lowLevel.ts#L656

const fs = require('fs');

class TrackingFSResolver {
  constructor() {
    this.fs = fs;
    this.filesLoaded = [];
  }

  content(path) {
    const pathString = String(path);

    if (!this.fs.existsSync(pathString)) {
      return null;
    }
    try {
      if (!this.filesLoaded.includes(pathString)) {
        this.filesLoaded.push(pathString);
      }
      return this.fs.readFileSync(pathString).toString();
    } catch (e) {
      this.filesLoaded = this.filesLoaded.filter(p => p !== pathString);
      return null;
    }
  }

  list(path) {
    return this.fs.readdirSync(path);
  }

  contentAsync(path) {
    return new Promise((resolve, reject) => {
      // eslint-disable-next-line consistent-return
      this.fs.readFile(path, (err, data) => {
        if (err != null) {
          this.filesLoaded = this.filesLoaded.filter(p => p !== path);
          return reject(err);
        }
        if (!this.filesLoaded.includes(path)) {
          this.filesLoaded.push(path);
        }
        const content = data.toString();
        resolve(content);
      });
    });
  }

  listAsync(path) {
    // eslint-disable-next-line consistent-return
    return new Promise((reject, resolve) => {
      // eslint-disable-next-line consistent-return
      this.fs.readdir(path, (err, files) => {
        if (err != null) {
          return Promise.reject(err);
        }
        resolve(files);
      });
    });
  }
}
module.exports = TrackingFSResolver;
