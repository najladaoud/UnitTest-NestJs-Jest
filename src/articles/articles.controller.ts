import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
} from "@nestjs/common";
import { ArticlesService } from "./articles.service";
import { CreateArticleDto } from "./dto/create-article.dto";
import { UpdateArticleDto } from "./dto/update-article.dto";
import { IDParmDTo } from "./dto/get-article.dto";

@Controller("articles")
export class ArticlesController {
  constructor(private readonly articlesService: ArticlesService) {}
  //---------------------------------------------------create----------------------------
  @Post()
  create(@Body() createArticleDto: CreateArticleDto) {
    return this.articlesService.create(createArticleDto);
  }
  //---------------------------------------------------findAll----------------------------

  @Get()
  findAll() {
    return this.articlesService.findAll();
  }
  //---------------------------------------------------findOne----------------------------

  @Get(":id")
  findOne(@Param("id") id: IDParmDTo) {
    return this.articlesService.findOne(+id.id);
  }
  //---------------------------------------------------update----------------------------

  @Put(":id")
  update(
    @Param("id") id: IDParmDTo,
    @Body() updateArticleDto: UpdateArticleDto
  ) {
    return this.articlesService.update(+id.id, updateArticleDto);
  }
  //---------------------------------------------------delete----------------------------
  @Delete(":id")
  remove(@Param("id") id: IDParmDTo) {
    return this.articlesService.remove(+id.id);
  }
}
