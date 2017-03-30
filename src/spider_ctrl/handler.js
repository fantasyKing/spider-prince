import util from './../util/util';
import spider from './../proxy/spider';
import {
  SpiderArticle
} from './../spider_proxy';

export default new class {
  handle = async (promise) => {
    const items = await promise;
    const { data } = items;

    for (let item of data) {
      item = util.filter(item, ['title', 'description', 'url', 'display_time', 'thumb', 'id']);
      const articleText = await SpiderArticle.scratch(item.url);
      item.text = articleText;
      item.display_time = new Date(util.formatTime(item.display_time)).toISOString();
      const artExist = await spider.findOne(item.article_id);
      console.log('artExist--->', artExist);
      if (artExist) {
        continue;
      }
      const result = await spider.saveArticle(item);
      console.log('result--->', result);
    }
  }
};
