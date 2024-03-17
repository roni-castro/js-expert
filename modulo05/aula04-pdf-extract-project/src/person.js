'use strict'
const {evaluateRegex} = require('./utils/safeRegex');

class Person {  
  constructor([
    name,
    nationality,
    maritalStatus,
    cpf,
    address,
    number,
    neighborhood,
    state
  ]) {
    function initialCap(str) {
      const firstLetterRegex = evaluateRegex(/^(\w{1})([a-zA-Z]+)$/)
      return str.replace(firstLetterRegex, (_match, p1, p2) => {
        return p1.toUpperCase() + p2.toLowerCase()
      })
    }

    function mapToNeighborhood(str) {
      return str.match(/(?<=\w\s)([\w\s]+)/g).join()
    }

    function mapToAddress(str) {
      return str.match(/(?<=\sa\s)([\w\s]+)/g).join()
    }

    function mapToState(str) {
      return str.replace(/\.$/, '')
    }

    function mapToCpf(str) {
      return str.replace(/(\D+)/g, '')
    }
    this.name = name
    this.nationality = initialCap(nationality),
    this.maritalStatus = initialCap(maritalStatus),
    this.cpf = mapToCpf(cpf),
    this.address = mapToAddress(address),
    this.number = number
    this.neighborhood = mapToNeighborhood(neighborhood),
    this.state = mapToState(state)
  }
}

module.exports = Person;
