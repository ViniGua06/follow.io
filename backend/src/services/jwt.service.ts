import jwt from "jsonwebtoken";

export default class JwtServices {
  createToken = (id: string) => {
    try {
      const token = jwt.sign({ id: id }, "SENHA", { expiresIn: "5m" });

      return token.toString();
    } catch (error) {
      throw error;
    }
  };
}
