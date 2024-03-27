export default class ContextStrategy {
  #strategy;
  constructor(strategy) {
    this.#strategy = strategy;
  }

  
  async connect() {
    return this.#strategy.connect();
  }

  async create(item) {
    return this.#strategy.create(item);
  }

  async read(item) {
    return this.#strategy.read(item);
  }
}