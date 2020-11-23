import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Article } from './article.schema';
import { GetArticleDto, SetArticleDto, QueryArticleDto } from './dto'

@Injectable()
export class ArticleService {

  constructor(
    @InjectModel(Article.name) private readonly articleModel: Model<Article>
  ) {}

    async search(getArticleDto: GetArticleDto):Promise<any> {
      const { limit } = getArticleDto;
      let data;
      if(limit) {
        // 分页查询
        data = await this.articleModel.find().limit(limit);
      }else {
        data = await this.articleModel.find();
      }
      return data;
    }

  async setArticle(setArticleDto: SetArticleDto):Promise<any> {
    // set文章
    // TODO: 索引及查询优化了解
    await new this.articleModel(setArticleDto).save()
    // const articleId = await setArticle.collection.createIndex(
    //   {title: 1},
    //   {
    //     // unique: true,
    //     background: true
    //   }
    // )
    // setArticle.articleId = articleId;
    return {...setArticleDto};
  }

  async queryArticle(queryArticleDto: QueryArticleDto):Promise<any> {
    const { keyword } = queryArticleDto;
    return this.articleModel.find({title: keyword});
  }
}