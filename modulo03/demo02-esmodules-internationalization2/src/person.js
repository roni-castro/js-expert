export default class Person {
  constructor({id, vehicles, kmTraveled, from, to}) {
    this.id = id;
    this.vehicles = vehicles;
    this.kmTraveled = kmTraveled;
    this.from = from;
    this.to = to;
  }

  static generateInstanceFromString(text) {
    '2 Barco,Moto,Bicicleta 100 2010-01-31 2015-12-31';
    const [id, vehicles, kmTraveled, from, to] = text.split(' ')

    return new Person({
      id: Number(id),
      vehicles: vehicles.split(','),
      kmTraveled: Number(kmTraveled),
      from,
      to
    })
  }

  formatted(language) {
    const toDate =(dateStr) => {
      const [year, month, day] = dateStr.split('-')
      console.log(year, month, day)
      return new Date(year, month - 1, day)
    }

    const formatDate = ({language, dateStr}) => {
      return new Intl.DateTimeFormat(language, {
        day: '2-digit',
        month: 'long',
        year: 'numeric',
      }).format(toDate(dateStr))
    }

    return {
      id: Number(this.id),
      vehicles: new Intl.ListFormat(language, {
        style: 'long',
        type: 'conjunction'
      }).format(this.vehicles),
      kmTraveled: new Intl.NumberFormat(language, {
        style: 'unit',
        unit: 'kilometer'
      }).format(this.kmTraveled),
      from: formatDate({language, dateStr: this.from}),
      to: formatDate({language, dateStr: this.to})
    }
  }
}