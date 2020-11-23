import { Controller, Get, Post, Body } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { Article } from './article.schema';
import { ArticleService } from './article.service';
import { GetArticleDto, SetArticleDto, QueryArticleDto } from './dto';

@Controller('article')
@ApiTags('文章相关')
export class ArticleController {
  constructor(private readonly articleService:ArticleService) {}

  @Get('get')
  async getArticle(@Body() body: GetArticleDto):Promise<any> {
    return await this.articleService.search(body);
  }

  @Post('set')
  async setArticle(@Body() body: SetArticleDto): Promise<Article> {
    return await this.articleService.setArticle(body);
  }

  @Post('query')
  async queryArticle(@Body() body: QueryArticleDto): Promise<any>{
    return await this.articleService.queryArticle(body);
  }
}