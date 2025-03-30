import PersonalizedError from "./error";

export default class NotFoundError extends PersonalizedError {
  constructor(message) {
    super(message);
    this.name = "NotFoundError";
    this.statusCode = 404;
  }
}
