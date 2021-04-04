import express from "express";
import config from "./config";
import { createConnection } from "typeorm";
import * as validatorMiddleware from "./middleware/validator";
import { verifyToken } from "./middleware/token";
import { homeController } from "./controllers/home";
import * as authController from "./controllers/auth";
import * as articleController from "./controllers/article";

const app = express();
const port = config.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//setup database connection
(async () => {
  try {
    console.log("env", process.env.POSTGRES_URL);
    const connection = await createConnection();
    console.log("connection", connection);
    console.log("Connection to Database established");
  } catch (err) {
    console.log("DB Connection Error: " + err);
  }

  app.get("/", homeController);
  app.post(
    "/auth/register",
    validatorMiddleware.register,
    authController.register
  );
  app.post("/auth/login", validatorMiddleware.login, authController.login);
  app.delete("/auth/:id", verifyToken, authController.deleteUser);
  app.post("/api/article", verifyToken, articleController.createArticle);
  app.get("/api/article", verifyToken, articleController.getArticle);
  app.get("/api/article/:id", verifyToken, articleController.getArticleByUser);
  app.put("/api/article/:id", verifyToken, articleController.updateArticle);
  app.delete("/api/article/:id", verifyToken, articleController.deleteArticle);

  app.listen(port, () => {
    console.log(`App listening on port ${port}...`);
  });
})();

export default app;
