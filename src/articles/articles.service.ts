import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from "@nestjs/common";
import { CreateArticleDto } from "./dto/create-article.dto";
import { UpdateArticleDto } from "./dto/update-article.dto";
import { Repository } from "typeorm";
import { Article } from "./entities/article.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { GetArticleDTO } from "./dto/get-article.dto";

@Injectable()
export class ArticlesService {
  constructor(
    @InjectRepository(Article)
    private articleRepository: Repository<Article>
  ) {}
  //----------------------------------------------add article---------------------------//

  async create(createArticleDto: CreateArticleDto): Promise<GetArticleDTO> {
    try {
      const resultCreate = await this.articleRepository.save(createArticleDto);
      return resultCreate;
    } catch (error) {
      throw new InternalServerErrorException("Error when creating article");
    }
  }

  //---------------------------------------find all article-------------------------------------//
  async findAll(): Promise<GetArticleDTO[]> {
    try {
      const querryResult = await this.articleRepository
        .createQueryBuilder("article")
        .orderBy("id", "ASC")
        .getMany();
      return querryResult;
    } catch (error) {
      throw new InternalServerErrorException("Error when finding article");
    }
  }
  //---------------------------------------findOne article-------------------------------------//

  async findOne(id: number): Promise<GetArticleDTO> {
    const article = await this.articleRepository.findOne({ where: { id: id } });
    if (!article) {
      throw new NotFoundException(`Article with id: ${id} is not Found`);
    }
    return article;
  }
  //---------------------------------------UPDATE article-------------------------------------//

  async update(id: number, updateArticleDto: UpdateArticleDto) {
    const articleSearch = await this.findOne(id);
    if (articleSearch) {
      try {
        this.articleRepository.update(id, updateArticleDto);
        const article = await this.articleRepository.findOne({
          where: { id: id },
        });
        return article;
      } catch (error) {
        throw new InternalServerErrorException("Error when updating article");
      }
    }
  }
  //---------------------------------------Delete article-------------------------------------//

  async remove(id: number) {
    const articleSearch = await this.findOne(id);
    if (articleSearch) {
      try {
        const res = await this.articleRepository.delete(id);
        return `Article with id: ${id} is deleted succesfully`;
      } catch (error) {
        throw new InternalServerErrorException("Error when deleting article");
      }
    }
  }
}
