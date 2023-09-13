import { InternalServerErrorException } from "@nestjs/common";
import { ArticlesController } from "./articles.controller";
import { ArticlesService } from "./articles.service";
import { Article } from "./entities/article.entity";
import { Repository } from "typeorm";

export const articleData = {
  id: 1,
  title: "unit testd backend",
  body: "unit test with nestjs and jest",
  resource: "medium",
};
export const allArticle = [
  {
    id: 1,
    title: "unit testd backend",
    body: "unit test with nestjs and jest",
    resource: "medium",
  },
];

export const articleDto = {
  title: "unit test",
  body: "unit test with nestjs and jest",
  resource: "medium",
};

describe("ArticlesService", () => {
  let articlesService: ArticlesService;
  let articleRepository: Partial<Repository<Article>> = {};
  let articlesController: ArticlesController;

  beforeEach(async () => {
    articlesService = new ArticlesService(
      articleRepository as Repository<Article>
    );
    articlesController = new ArticlesController(articlesService);
  });

  describe("createArticle", () => {
    it("should create a new article", async () => {
      //spy on the article service
      jest.spyOn(articlesService, "create").mockResolvedValue(articleData);
      //call the createArticle endpoint with the articleData
      const result = await articlesService.create(articleDto);
      //check the reponse and expectation
      expect(result).toBe(articleData);
    });
  });
  //--------------------------- function to test get articles-----------------------------------//
  describe("findAll", () => {
    it("should return an array of articles", async () => {
      //spy on the article service
      jest.spyOn(articlesService, "findAll").mockResolvedValue(allArticle);
      //call the createArticle endpoint with the articleData
      const result = await articlesService.findAll();
      //check the reponse and expectation
      expect(result).toBe(allArticle);
    });
  });
  //--------------------------- function to test get an article-----------------------------------//
  describe("findOne", () => {
    it("should return an article", async () => {
      //spy on the article service
      jest.spyOn(articlesService, "findOne").mockResolvedValue(articleData);
      //call the createArticle endpoint with the articleData
      const result = await articlesService.findOne(1);
      //check the reponse and expectation
      expect(result).toBe(articleData);
    });
  });
  //--------------------------- function to test delete an article-----------------------------------//
  describe("update", () => {
    it("should update an article", async () => {
      const id: number = 1;
      // Mock the findOne method to return the initial data
      jest.spyOn(articlesService, "findOne").mockResolvedValue(articleData);

      // Mock the update method to succeed
      jest.spyOn(articlesService, "update").mockResolvedValue(articleData);

      // Mock the findOne method again to return the updated data
      jest.spyOn(articlesService, "findOne").mockResolvedValue(articleData);

      const result = await articlesService.update(id, articleDto);

      // Check the response and expectation
      expect(result).toBe(articleData);
    });
  });

  //--------------------------- function to test delete an article-----------------------------------//
  describe("delete", () => {
    it("should delete an article", async () => {
      const id: number = 1;
      //spy on the article service
      jest.spyOn(articlesService, "findOne").mockResolvedValue(articleData);

      articleRepository.delete = jest.fn().mockResolvedValue("");
      articleRepository.find = jest.fn().mockResolvedValue(articleData);
      //call the createArticle endpoint with the articleData
      const result = await articlesService.remove(id);
      //check the reponse and expectation
      expect(result).toBe(`Article with id: ${id} is deleted succesfully`);
    });
  });
});
