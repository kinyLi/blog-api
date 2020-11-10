import { Injectable } from '@nestjs/common';
import { SetArticleDto } from './dto/set-article.dto';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Article } from './article.schema';

@Injectable()
export class ArticleService {

  constructor(
    @InjectModel(Article.name) private readonly articleModel: Model<Article>
  ) {}

    async search(): Promise<any> {
      const data = await this.articleModel.find();
      return data;
    }

  async setArticle(setArticleDto: SetArticleDto):Promise<any> {
    const setArticle = new this.articleModel(setArticleDto);
    setArticle.save();
    return setArticleDto;
  }
}