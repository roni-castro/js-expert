export default class Person {
  constructor({id, vehicles, kmTraveled, from, to}) {
    this.id = id;
    this.vehicles = vehicles;
    this.kmTraveled = kmTraveled;
    this.from = from;
    this.to = to;
  }

  formatted(language) {
    const mapDate = (dateStr) => {
      const DATE_DELIMITER = '-';
      const [year, month, day] = dateStr.split(DATE_DELIMITER).map(Number);
      const date = new Date(year, month - 1, day);
      return date;
    };

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
      from: new Intl.DateTimeFormat(language, {
        month: 'long',
        day: 'numeric',
        year: 'numeric'
      }).format(mapDate(this.from)),
      to: new Intl.DateTimeFormat(language, {
        month: 'long',
        day: 'numeric',
        year: 'numeric'
      }).format(mapDate(this.to))
    };
  }
}
