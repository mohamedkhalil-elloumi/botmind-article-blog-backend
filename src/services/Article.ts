import config from "../config";
import { Article } from "../entity/Article";
import { User } from "../entity/User";

export class ArticleService {
  constructor() {}

  public async createArticle(user_id: number, content: string) {
    try {
      const userData = await User.findOne(user_id);
      if (userData === undefined) throw new Error("User not found");
      const article = new Article();
      article.user = userData;
      article.content = content;
      return await article.save();
    } catch (error) {
      throw new Error(error);
    }
  }

  public async readArticles() {
    try {
      const articles = await Article.find({
        order: {
          createdAt: "DESC",
        },
        relations: ["user"],
      });
      return articles;
    } catch (error) {
      throw new Error(error);
    }
  }

  public async updateArticle(article_id: number, content: string) {
    try {
      const articleData = await Article.findOne(article_id);
      if (articleData === undefined) throw new Error("Article not found");
      articleData.content = content;
      await Article.save(articleData);
      const articleToReturn = await Article.findOne(article_id, {
        relations: ["user"],
      });
      return articleToReturn;
    } catch (error) {
      throw new Error(error);
    }
  }

  public async getArticleByUser(user_id: number) {
    try {
      const articlesByUser = await Article.find({
        order: {
          createdAt: "DESC",
        },
        relations: ["user"],
        where: { user: user_id },
      });
      return articlesByUser;
    } catch (error) {
      throw new Error(error);
    }
  }

  public async deleteArticle(article_id: number) {
    try {
      const articleData = await Article.findOne(article_id);
      if (articleData === undefined) throw new Error("Article not found");
      await Article.remove(articleData);
      return true;
    } catch (error) {
      throw new Error(error);
    }
  }
}
