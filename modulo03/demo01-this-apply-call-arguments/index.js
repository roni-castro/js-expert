'use strict';

const {
  watch,
  promises: {readFile}
} = require('fs');

class File {
  watch(_event, filename) {
    console.log('arguments', Array.prototype.slice.call(arguments));
    this.showContent(filename);
  }

  async showContent(filename) {
    console.log((await readFile(filename)).toString());
  }
}

const file = new File();
// inherits the this from the watch
// watch(__filename, file.watch);

// pass custom context using call
file.watch.call(
  {showContent: () => console.log('call context')},
  null,
  __filename
);

// pass custom context using apply
file.watch.apply({showContent: () => console.log('apply context')}, [
  null,
  __filename
]);

// binds the this context inside watch to the file instance, and returns it
watch(__filename, file.watch.bind(file));
