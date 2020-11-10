import { Controller, Get, Post, Body } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { SetArticleDto } from './dto/set-article.dto';
import { Article } from './article.schema';
import { ArticleService } from './article.service';

@Controller('article')
@ApiTags('文章相关')
export class ArticleController {
  constructor(private readonly articleService:ArticleService) {}

  @Get()
  async index():Promise<any> {
    const data = await this.articleService.search();
    return data;
  }

  @Post()
  async setArticle(@Body() body: SetArticleDto): Promise<Article> {
    const data = await this.articleService.setArticle(body);
    return data;
  }
}