import { Request, Response } from "express";
import { ArticleService } from "../services/Article";

const articleService = new ArticleService();

/**
 *
 * @param req
 * @param res
 */

// get all articles and send them in JSON payload
export async function getArticle(req: Request, res: Response) {
  try {
    const payload = await articleService.readArticles();
    return res.status(200).json({
      message: "Article read",
      data: payload,
    });
  } catch (error) {
    return res.status(500).json({
      error: true,
      message: "An internal server error has occurred",
    });
  }
}

// create and article and return it to frontend
export async function createArticle(req: Request, res: Response) {
  const { user_id, content } = req.body;
  try {
    const payload = await articleService.createArticle(user_id, content);
    return res.status(201).json({
      message: "Article created",
      data: payload,
    });
  } catch (error) {
    if (String(error).includes("User not found")) {
      return res.status(404).json({
        error: true,
        message: "User does not exist",
      });
    } else {
      return res.status(500).json({
        error: true,
        message: "An internal server error has occurred",
      });
    }
  }
}

//update the content of one article
export async function updateArticle(req: Request, res: Response) {
  const article_id = Number(req.params.id);
  const { content } = req.body;
  try {
    const payload = await articleService.updateArticle(article_id, content);
    return res.status(200).json({
      message: "Article updated",
      data: payload,
    });
  } catch (error) {
    if (String(error).includes("Article not found")) {
      return res.status(404).json({
        error: true,
        message: "Article not found",
      });
    } else {
      return res.status(500).json({
        error: true,
        message: "An internal server error has occurred",
      });
    }
  }
}

// get all the articles of one single user
export async function getArticleByUser(req: Request, res: Response) {
  const user_id = Number(req.params.id);
  try {
    const payload = await articleService.getArticleByUser(user_id);
    return res.status(200).json({
      message: "User read",
      data: payload,
    });
  } catch (error) {
    return res.status(500).json({
      error: true,
      message: "An internal server error has occurred",
    });
  }
}

// delete a user's article
export async function deleteArticle(req: Request, res: Response) {
  const article_id = Number(req.params.id);
  try {
    const payload = await articleService.deleteArticle(article_id);
    return res.status(200).json({
      message: "Article deleted",
    });
  } catch (error) {
    if (String(error).includes("Article not found")) {
      return res.status(404).json({
        error: true,
        message: "Article not found",
      });
    } else {
      return res.status(500).json({
        error: true,
        message: "An internal server error has occurred",
      });
    }
  }
}
