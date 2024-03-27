import PostgresStrategy from './strategies/postgresStrategy.js';
import MongoDBStrategy from './strategies/mongodbStrategy.js';
import ContextStrategy from './base/contextStrategy.js';

const data = [
  {
    name: 'Hero 1',
    type: 'transactional'
  },
  {
    name: 'Hero2',
    type: 'activityLog'
  },
  {
    name: 'Hero 3',
    type: 'transactional'
  }
]

const postgresConnectionString = 'postgresql://admin:postgres_pass@localhost:5432/heroes';
const postgresContext = new ContextStrategy(new PostgresStrategy(postgresConnectionString));
await postgresContext.connect();

const mongoDBConnectionString = 'mongodb://admin:mongodb_pass@localhost:27017/heroes';
const mongoDBContext = new ContextStrategy(new MongoDBStrategy(mongoDBConnectionString));
await mongoDBContext.connect();

const strategyMap = {
  transactional: postgresContext,
  activityLog: mongoDBContext
}

for(const {type, name} of data) {
  const context = strategyMap[type]
  await context.create({name: name + Date.now()})
  console.log(type, context)
  const result = await context.read()
  console.log(result)
}
