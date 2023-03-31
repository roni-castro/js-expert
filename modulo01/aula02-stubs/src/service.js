class Service {
  async makeRequest(url) {
    return fetch(url).then((res) => res.json());
  }

  async getPlanets(url) {
    const data = await this.makeRequest(url);
    return {
      name: data.name,
      surfaceWater: data.surface_water,
      appearedIn: data.films.length
    };
  }
}

module.exports = Service;
