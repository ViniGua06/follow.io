import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import { AppDataSource } from "./data-source";
import userRouter from "./routes/user.router";
import ErrorHandler from "./middlewares/error/errorHandler.middleware";
import cookieParser from "cookie-parser";

const app = express();

const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

app.use(cookieParser());

app.use("/user", userRouter);

app.use(ErrorHandler.bind(ErrorHandler));

AppDataSource.initialize().then(() => {
  app.listen(PORT, () => {
    console.log("Servidor rodando na porta", PORT);
  });
});
