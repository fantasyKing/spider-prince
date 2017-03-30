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
      const { data } = items;

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
      const articleText = await SpiderArticle.scratch(item.url);
      item.text = articleText;
      const display_time = util.formatTime(item.display_time);
      item.display_time = display_time && new Date(display_time).toISOString();
      const artExist = await spider.findOne(item.article_id);
      console.log('artExist--->', artExist);
      if (artExist) {
        return;
      }
      await spider.saveArticle(item);
      this.num++;
      console.log('saveArticle', item.title, this.num);
    } catch (err) {
      console.log('spider.detail.error', err.name, err.message);
    }
  }
};
