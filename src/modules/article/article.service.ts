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

    async search(getArticleDto):Promise<any> {
      let { page, limit } = getArticleDto;
      page = parseInt(page);
      limit = parseInt(limit);
      let data, isEnd;
      if(page && limit) {
        // 分页查询 故意多请求一条 用于判断是否到达页底
        data = await this.articleModel.find().skip(page === 1 ? 0 : (page -1) * 10).limit(limit + 1);
        // 判断是否加载完毕,
        isEnd = data.length > limit ? 0 : 1;
        !isEnd ? data.pop() : null;
      }else {
        data = await this.articleModel.find();
        isEnd = 1;
      }

      return { data, isEnd };
    }

  async setArticle(setArticleDto: SetArticleDto):Promise<any> {
    setArticleDto.date = +(new Date().getTime().toString().substring(0, 10));
    // 有描叙的情况使用描叙, 没有则使用内容前20字作为描叙
    if(!setArticleDto.description) {
      setArticleDto.description = setArticleDto.content.substring(0, 20);
    }

    await this.articleModel.insertMany(setArticleDto);
    return {...setArticleDto};
  }

  async queryArticle(queryArticleDto: QueryArticleDto):Promise<any> {
    const { keyword, startTime, endTime } = queryArticleDto;

    if(keyword) {
      const reg = new RegExp(keyword, 'i');
      const filter = {
        $or: [
          {title: {$regex: reg}},
          {content: {$regex: reg}}
        ]
      }
      return this.articleModel.find(filter  );
    }
    // 关键字 模糊查询
    if(startTime && endTime) {
      return this.articleModel.find({ date: { '$gte': parseInt(startTime), '$lt': parseInt(endTime) } })
    }

    return [];
  }

  async deleteArticle(id: string): Promise<number> {
    await this.articleModel.findByIdAndRemove(id);
    return 200;
  }
}
