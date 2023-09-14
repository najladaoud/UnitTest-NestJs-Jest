import { ArticlesController } from "./articles.controller";
import { ArticlesService } from "./articles.service";
import { allArticle, articleData, articleDto } from "./articles.service.spec";
import { IDParmDTo } from "./dto/get-article.dto";
import { Article } from "./entities/article.entity";
import { Repository } from "typeorm";

describe("ArticlesController", () => {
  let articlesService: ArticlesService;
  let articleRepository: Partial<Repository<Article>> = {};
  let articlesController: ArticlesController;

  beforeEach(async () => {
    articlesService = new ArticlesService(
      articleRepository as Repository<Article>
    );
    articlesController = new ArticlesController(articlesService);
  });

  //--------------------------- function to test create article-----------------------------------//
  describe("createArticle", () => {
    it("should create a new article", async () => {
      //spy on the article service
      jest.spyOn(articlesController, "create").mockResolvedValue(articleData);
      //call the createArticle endpoint with the articleData
      const result = await articlesController.create(articleDto);
      //check the reponse and expectation
      expect(result).toBe(articleData);
    });
  });
  //--------------------------- function to test get articles-----------------------------------//
  describe("findAll", () => {
    it("should return an array of articles", async () => {
      //spy on the article service
      jest.spyOn(articlesController, "findAll").mockResolvedValue(allArticle);
      //call the createArticle endpoint with the articleData
      const result = await articlesController.findAll();
      //check the reponse and expectation
      expect(result).toBe(allArticle);
    });
  });
  //--------------------------- function to test get an article-----------------------------------//
  describe("findOne", () => {
    it("should return an article", async () => {
      const id: IDParmDTo = { id: 1 };

      //spy on the article service
      jest.spyOn(articlesController, "findOne").mockResolvedValue(articleData);
      //call the createArticle endpoint with the articleData
      const result = await articlesController.findOne(id);
      //check the reponse and expectation
      expect(result).toBe(articleData);
    });
  });
  //--------------------------- function to test delete an article-----------------------------------//
  describe("update", () => {
    it("should update an article", async () => {
      const id: IDParmDTo = { id: 1 };
      // Mock the findOne method to return the initial data
      jest.spyOn(articlesController, "findOne").mockResolvedValue(articleData);

      // Mock the update method to succeed
      jest.spyOn(articlesController, "update").mockResolvedValue(articleData);

      // Mock the findOne method again to return the updated data
      jest.spyOn(articlesController, "findOne").mockResolvedValue(articleData);

      const result = await articlesController.update(id, articleDto);

      // Check the response and expectation
      expect(result).toBe(articleData);
    });
  });

  //--------------------------- function to test delete an article-----------------------------------//
  describe("delete", () => {
    it("should delete an article", async () => {
      const id: IDParmDTo = { id: 1 };
      //spy on the article service
      jest.spyOn(articlesController, "findOne").mockResolvedValue(articleData);

      articleRepository.delete = jest.fn().mockResolvedValue("");
      articleRepository.findOne = jest.fn().mockResolvedValue(articleData);
      //call the createArticle endpoint with the articleData
      const result = await articlesController.remove(id);
      //check the reponse and expectation
      expect(result).toBe(`Article with id: ${id.id} is deleted succesfully`);
    });
  });
});
