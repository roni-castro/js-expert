import {writeFile, readFile} from 'fs/promises';
import Person from './person.js';

// ESM does not have __filename or __dirname, so get path using URL
const {pathname: databaseFile} = new URL('./../database.json', import.meta.url);

export const getAll = async () => {
  const fileData = (await readFile(databaseFile)).toString();
  const data = JSON.parse(fileData);
  const persons = data.map((personData) => new Person(personData));
  return persons;
};

export const save = async (newData) => {
  const currentData = await getAll();
  currentData.push(newData);
  await writeFile(databaseFile, JSON.stringify(currentData));
};
