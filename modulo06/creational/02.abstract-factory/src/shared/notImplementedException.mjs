export default class NotImplementedException extends Error {
  constructor(method) {
    super(`The ${method} function was not implemented`);
    this.name = 'NotImplementedException';
  }
}
