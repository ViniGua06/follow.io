import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import { AppDataSource } from "./data-source";
import userRouter from "./routes/user.router";
import ErrorHandler from "./middlewares/error/errorHandler.middleware";
import cookieParser from "cookie-parser";
import postRouter from "./routes/post.router";

const app = express();

const PORT = process.env.PORT || 3000;

import swaggerUi from "swagger-ui-express";
import swaggerJsdoc from "swagger-jsdoc";
import commentRouter from "./routes/comment.router";
import followerRouter from "./routes/follower.router";

// Configuração do Swagger
const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Sua API Express",
      version: "1.0.0",
      description: "Documentação da API",
    },
    servers: [
      {
        url: `http://localhost:${PORT}`,
      },
    ],
  },
  apis: ["./src/routes/*.ts"], // Caminho para seus arquivos de rota
};

const specs = swaggerJsdoc(options);

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(specs));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

app.use(cookieParser());

app.use("/user", userRouter);
app.use("/post", postRouter);
app.use("/comment", commentRouter);
app.use("/follower", followerRouter);
app.use("/tag", tagRou);

app.use(ErrorHandler.bind(ErrorHandler));

AppDataSource.initialize().then(() => {
  app.listen(PORT, () => {
    console.log("Servidor rodando na porta", PORT);
  });
});
