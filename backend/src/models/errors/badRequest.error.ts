import PersonalizedError from "./error";

export default class BadRequestError extends PersonalizedError {
  constructor(message) {
    super(message);
    this.name = "BadRequestError";
    this.statusCode = 400;
  }
}
