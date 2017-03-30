import config from './../config';
import {
  SpiderTab,
  SpiderAjax,
  SpiderArticle
} from './../spider_proxy';
import util from './../util/util';
import spider from './../proxy/spider';

export default new class {
  /**
   * 1. 抓取tab
   * 2. 通过archivesUrls, 用ajax抓取items
   * 3. 将item存入mongodb
   */
  scratch = async () => {
    const tabs = await SpiderTab.scratch(config.uri);
    let i = 0;
    for (const tab of tabs) {
      const archivesUrls = util.getArchivesUrls(tab);

      for (const archiveUrl of archivesUrls) {
        const items = await SpiderAjax.scratch(archiveUrl);

        const { data } = items;

        for (let item of data) {
          item = util.filter(item, ['title', 'description', 'url', 'display_time', 'thumb', 'id']);
          const articleText = await SpiderArticle.scratch(item.url);
          item.text = articleText;
          item.display_time = new Date(util.formatTime(item.display_time)).toISOString();
          const result = await spider.saveArticle(item);
          console.log('result--->', result);
          i++;
        }
      }
    }
    console.log('the count of articles is =', i);
  }
};
