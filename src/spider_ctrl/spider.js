import config from './../config';
import {
  SpiderTab,
  SpiderAjax
} from './../spider_proxy';
import util from './../util/util';
import handler from './handler';


export default new class {
  /**
   * 1. 抓取tab
   * 2. 通过archivesUrls, 用ajax抓取items
   * 3. 将item存入mongodb
   */
  scratch = async () => {
    const tabs = await SpiderTab.scratch(config.uri); // 抓取目标网站的tab
    for (const tab of tabs) {
      const archivesUrls = util.getArchivesUrls(tab);

      for (const archiveUrl of archivesUrls) {
        const result = SpiderAjax.scratch(archiveUrl); // 开始抓取单页的文章
        handler.handle(result); // 处理抓取的结果
        await util.sleep(1000); // 暂停1s，防止达到目标网站的RateLimit
      }
    }
  }
};
