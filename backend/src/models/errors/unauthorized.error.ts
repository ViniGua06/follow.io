import PersonalizedError from "./error";

export default class UnauthorizedError extends PersonalizedError {
  constructor(message) {
    super(message);
    this.name = "UnauthorizedError";
    this.statusCode = 401;
  }
}
