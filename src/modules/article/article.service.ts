import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Article } from './article.schema';
import { GetArticleDto, SetArticleDto, QueryArticleDto } from './dto'

@Injectable()
export class ArticleService {

  constructor(
    @InjectModel(Article.name) private readonly articleModel: Model<Article>
  ) {
  }

    async search():Promise<any> {
      // const { limit } = getArticleDto;
      const data = await this.articleModel.find({title_id: 1});
      // let data;
      // if(limit) {
      //   // 分页查询
      //   data = await this.articleModel.find().limit(limit);
      // }else {
      //   data = await this.articleModel.find({title_id: 2});
      // }
      return data;
    }

  async setArticle(setArticleDto: SetArticleDto):Promise<any> {
    await this.articleModel.insertMany(setArticleDto);
    await this.articleModel.db.collection('articles').createIndex({
      title_id: 1
    })
    // set
    // articleModel.db.collection(Article.name).createIndex({title_id: 1})
    // await new this.articleModel(setArticleDto).save()
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
