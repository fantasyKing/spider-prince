import cheerio from 'cheerio';

import config from './../config';
import {
  SpiderTab,
  SpiderAjax
} from './../spider_proxy';
import util from './../util/util';

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
        const articles = [];

        for (let item of data) {
          item = util.filter(item, ['title', 'description', 'url', 'display_time', 'thumb']);
          articles.push(item);
          i++;
        }
        console.log('articles---->', articles);
      }
    }
    console.log('the count of articles is =', i);
  }
};
