import config from "../config";
import { Article } from "../entity/Article";
import { User } from "../entity/User";

// article services to communicate with the DB
export class ArticleService {
  constructor() {}

  // create an article 
  public async createArticle(user_id: number, content: string) {
    try {
      //check if the user that will create exists then push an element containing article and user data
      const userData = await User.findOne(user_id);
      if (userData === undefined) throw new Error("User not found");
      const article = new Article();
      article.user = userData;
      article.content = content;
      // return article data for frontend purposes
      return await article.save();
    } catch (error) {
      throw new Error(error);
    }
  }

  /**
   Here, I made a simple query to get all the articles that exist. Although I know 
   that the best option was to stream the data flow 10 by 10 to the frontend to avoid runtime problems
   for this request, but it was a matter of time and how to investigate the problem mainly 
   so I choose the easiest way
   */
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

  // Update an article content
  public async updateArticle(article_id: number, content: string) {
    try {
      // find the concerned article and update its content then return its content
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

  /*find the articles of one user using the relations parameter
  because of the one-to-many and many-to-one relation between the tables*/
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

  // delete a user's article
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
