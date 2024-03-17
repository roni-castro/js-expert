'use strict'

import { writeFile, readFile } from 'fs/promises'
import Person from './person.js';
const {pathname: databaseFile} = new URL('./database.json', import.meta.url);

class PersonRepository {
  constructor() {
  }

  async getAll() {
    const fileData = (await readFile(databaseFile)).toString();
    const data = JSON.parse(fileData);
    const people = data.map((personData) => new Person(personData));
    return people
  }

  async add(person) {
    const fileData = (await readFile(databaseFile)).toString();
    const data = JSON.parse(fileData);
    data.push(person)
    await writeFile(databaseFile, JSON.stringify(data))
  }
}

export default PersonRepository