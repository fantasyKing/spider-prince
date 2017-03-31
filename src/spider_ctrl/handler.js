import util from './../util/util';
import spider from './../proxy/spider';
import {
  SpiderArticle
} from './../spider_proxy';

export default new class {
  constructor() {
    this.num = 0;
  }

  handle = async (promise) => {
    try {
      const items = await promise;
      const { data } = items; // data 中包含文章的列表

      for (const item of data) {
        this.detail(item);
      }
    } catch (err) {
      console.log('spider.hander.error', err.name, err.message);
    }
  }

  detail = async (item) => {
    try {
      item = util.filter(item, ['title', 'description', 'url', 'display_time', 'thumb', 'id']);
      const artExist = await spider.findOne(item.article_id); // 判断文章是否已经被抓取过
      console.log('artExist--->', artExist);
      if (artExist) {
        return;
      }
      const articleText = await SpiderArticle.scratch(item.url); // 抓取文章的内容，用于搜索
      item.text = articleText;
      const display_time = util.formatTime(item.display_time);
      item.display_time = display_time && new Date(display_time).toISOString();
      await spider.saveArticle(item); // 将文章存入数据库
      this.num++;
      console.log('saveArticle', item.title, this.num);
    } catch (err) {
      console.log('spider.detail.error', err.name, err.message);
    }
  }
};
