import MongoDb from 'mongodb';

export default class MongoDBStrategy {
  #connectionString;
  #collection;
  #instance
  constructor(connectionString) {
    this.#connectionString = connectionString;
    this.#collection = 'warriors';
  }

  async connect() { 
    const {pathname} = new URL(this.#connectionString)
    this.#connectionString = this.#connectionString.replace(pathname, '')
    const dbName = pathname.replace(/\W/, '')
    const mongoClient = new MongoDb.MongoClient(this.#connectionString, {
      useUnifiedTopology: true
    })
    await mongoClient.connect()
    const db = mongoClient.db(dbName).collection(this.#collection)
    this.#instance = db
  }

  async create(item) {
    return this.#instance.insertOne(item)
  } 

  async read(item) {
    return this.#instance.find({}).toArray()
  } 
}