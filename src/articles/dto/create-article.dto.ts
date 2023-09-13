import { IsString } from "class-validator";
export class CreateArticleDto {
  @IsString()
  title: string;
  @IsString()
  body: string;
  @IsString()
  resource: string;
}
