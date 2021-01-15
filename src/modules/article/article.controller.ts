import { Controller, Get, Post, Body, Query, Delete } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { Article } from './article.schema';
import { ArticleService } from './article.service';
import { GetArticleDto, SetArticleDto, QueryArticleDto, DeleteArticleDto } from './dto';

@Controller('article')
@ApiTags('文章相关')
export class ArticleController {
  constructor(private readonly articleService:ArticleService) {}

  @Get('get')
  async getArticle(@Query() body: GetArticleDto):Promise<any> {
    return await this.articleService.search(body);
  }

  @Post('set')
  async setArticle(@Body() body: SetArticleDto): Promise<Article> {
    return await this.articleService.setArticle(body);
  }

  @Get('query')
  async queryArticle(@Query() body: QueryArticleDto): Promise<any>{
    return await this.articleService.queryArticle(body);
  }

  @Delete('delete')
  async deleteArticle(@Body() body: DeleteArticleDto): Promise<number> {
    return await this.articleService.deleteArticle(body.id)
  }
}
