import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Article } from './article.schema';
import { GetArticleDto, SetArticleDto, QueryArticleDto } from './dto/index'

@Injectable()
export class ArticleService {

  constructor(
    @InjectModel(Article.name) private readonly articleModel: Model<Article>
  ) {}

    async search(getArticleDto: GetArticleDto):Promise<any> {
      const { limit } = getArticleDto;
      let data = null
      if(limit) {
        // 分页查询
        data = await this.articleModel.find().limit(limit);
      }else {
        data = await this.articleModel.find();
      }
      return data;
    }

  async setArticle(setArticleDto: SetArticleDto):Promise<any> {
    const setArticle = new this.articleModel(setArticleDto);
    setArticle.save();
    return setArticleDto;
  }

  async queryArticle(queryArticleDto: QueryArticleDto):Promise<any> {
    const { keyword } = queryArticleDto;
    const data = await this.articleModel.find({title: keyword});
    return data;
  }
}