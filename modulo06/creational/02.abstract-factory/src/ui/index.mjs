import {database} from '../shared/data.mjs';

class Application {
  constructor(viewFactory) {
    const table = viewFactory.createTable();
    this.table = table;
  }

  initialize(database) {
    this.table.render(database);
  }
}

(async function main() {
  const path = globalThis.window ? 'browser' : 'console';

  const {default: ViewFactory} = await import(`../platforms/${path}/index.mjs`);
  const viewFactory = new ViewFactory();
  const app = new Application(viewFactory);
  app.initialize(database);
})();
