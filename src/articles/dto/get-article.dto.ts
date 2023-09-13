import { IsNumber, IsPositive, IsString } from "class-validator";
import { Type } from "class-transformer";
export class IDParmDTo {
  @IsNumber()
  @IsPositive()
  @Type(() => Number)
  id: number;
}

export class GetArticleDTO {
  @IsNumber()
  id: number;
  @IsString()
  title: string;
  @IsString()
  body: string;
  @IsString()
  resource: string;
}
