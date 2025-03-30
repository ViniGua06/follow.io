export default class PersonalizedError extends Error {
  statusCode: number;

  constructor(message: string) {
    super(message);
    this.name = this.constructor.name;
    this.statusCode = 500;

    Object.setPrototypeOf(this, new.target.prototype);
  }
}
