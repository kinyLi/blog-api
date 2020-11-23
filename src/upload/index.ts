import { Injectable } from '@nestjs/common';
import * as fs from 'fs';
import * as path from 'path';
import { imageHost } from 'src/utils/constant';


interface Cache {
  data: Buffer,
  dataName: string,
  cacheName: string,
  type: 'host' | 'local'
}

@Injectable()
class UploadCache {

  /**
   * 删除缓存区文件夹
   * @cacheName 缓存区文件夹名
   */
  async delCachePath(cacheName: string):Promise<string> {
    if(!cacheName) return 'fail';
    const cachePath = await this.getCachePath(cacheName);
    // 若无文件夹则不需要删除
    if(!fs.existsSync(cachePath)) return 'fail';
    // 获取缓存区文件夹内是否有子文件 有则删除
    const cacheFile = await this.getCacheFile(cacheName, 'local');
    if(cacheFile && cacheFile.length) {
        cacheFile.forEach((item) => {
          // 判断子文件类型是文件夹还是文件,文件直接删除,文件夹则递归调用delCachePath
          const stats = fs.statSync(item);
          if(stats.isFile()) {
            fs.unlinkSync(item);
          } else {
            this.delCachePath(cacheName + '/' + item);
          }
        })
      // 清除空文件夹
    }
    fs.rmdirSync(cachePath);
    return 'success';
  }

  /**
   * 获取缓存区文件路径
   * @cacheName 缓存区文件夹名
   */
  async getCachePath(cacheName: string):Promise<string> {
    if(!cacheName) return 'error';
    return path.join(__dirname, cacheName);
  }

  /**
   * 读取缓存区文件
   * @cacheName 缓存区文件夹名
   * @type 读取缓存区文件方式local: 本地 | host: 网络地址
   */
  async getCacheFile(cacheName: string, type: 'local' | 'host'):Promise<string[]> {
    // 先获取文件路径再获取文件
    const cachePath = await this.getCachePath(cacheName);
    const data = await fs.readdirSync(cachePath);

    // 若文件不存则返回[],存在则判断是需要 local | host 路径返回对应路径
    if(data && data.length) {
      if(type === 'local') {
        return data.map((item) => {
          return cachePath + '/' + item;
        })
      } else if(type === 'host') {
        return data.map((item) => {
          return imageHost + cacheName + '/' + item;
        })
      }
    }
    return [];
  }

  /**
   * 缓存文件至缓存区
   * @data 文件buffer
   * @dataName 文件名
   * @cacheName 缓存区文件夹名
   * @type 读取缓存区文件方式local: 本地 | host: 网络地址
   */
  async cache({ data, dataName, cacheName, type }:Cache):Promise<string[]> {
    if(!data || !cacheName) return;

    // 获取缓存区文件夹路径 若不存在则新建一个
    const cachePath = await this.getCachePath(cacheName);
    if(!fs.existsSync(cachePath)) {
      try{
        await fs.mkdirSync(cachePath);
      }catch (err) {
        console.log(err);
      }
    }

    // 获取文件路径并保存
    const dataPath = await path.join(cachePath, dataName);
    try {
      await fs.writeFileSync(dataPath, data, {flag: 'as+'});
    } catch(err) {
      console.log(err);
    }

    // 返回文件路径 local | host
    return await this.getCacheFile(cacheName, type);
  }
}

export default new UploadCache();