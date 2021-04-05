import express from "express";
import config from "./config";
import { createConnection } from "typeorm";
import * as validatorMiddleware from "./middleware/validator";
import { verifyToken } from "./middleware/token";
import { homeController } from "./controllers/home";
import * as authController from "./controllers/auth";
import * as articleController from "./controllers/article";

// declaring express server
const app = express();
const port = config.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//setup database connection
(async () => {
  try {
    const connection = await createConnection();
    console.log("Connection to Database established");
  } catch (err) {
    console.log("DB Connection Error: " + err);
  }

  //home route
  app.get("/", homeController);
  //register user route
  
  app.post(
    "/auth/register",
    validatorMiddleware.register,
    authController.register
  );
  //login user route
  app.post("/auth/login", validatorMiddleware.login, authController.login);
  //delete user route
  app.delete("/auth/:id", verifyToken, authController.deleteUser);

  // create an article route
  app.post("/api/article", verifyToken, articleController.createArticle);
  //list all articles route
  app.get("/api/article", verifyToken, articleController.getArticle);
  // get all the articles of one user route
  app.get("/api/article/:id", verifyToken, articleController.getArticleByUser);
  // update a user's article route
  app.put("/api/article/:id", verifyToken, articleController.updateArticle);
  // delete a user's article route
  app.delete("/api/article/:id", verifyToken, articleController.deleteArticle);

  app.listen(port, () => {
    console.log(`App listening on port ${port}...`);
  });
})();

export default app;
