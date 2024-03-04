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
// watch(__filename, file.watch); // error, because this context is from the watch
// watch(__filename, (event, filename) => file.watch(event, filename)); // success

// pass custom context using call
file.watch.call(
  {showContent: () => console.log('override showContent using call\n')},
  null, // event param
  __filename // filename param
);

// pass custom context using apply
file.watch.apply(
  {showContent: () => console.log('override showContent using apply\n')},
  [
    null, // event param
  __filename // filename param
  ]
);

// binds the this context inside watch to the file instance, and returns it
watch(__filename, file.watch.bind(file));
