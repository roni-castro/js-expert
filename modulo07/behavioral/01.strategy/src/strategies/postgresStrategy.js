import knex from 'knex';

export default class PostgresStrategy {
  #connectionString;
  #instance
  #table
  constructor(connectionString) {
    this.#connectionString = connectionString;
    this.#table = 'warriors';
  }

  async connect() {
    const database = knex({
      client: 'pg',
      connection: this.#connectionString,
    });
    this.#instance = database;
    
    return this.#instance.raw(`SELECT 1 + 1 AS result`);
  }

  async create(item) {
    return this.#instance
      .insert(item)
      .into(this.#table);
  }

  async read(item) {
    return this.#instance
      .select()
      .from(this.#table);
  }
}