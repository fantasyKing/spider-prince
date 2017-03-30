import Crawler from 'crawler';

/**
 * Crawler: https://github.com/bda-research/node-crawler
 * 爬虫的原理：
 * 1. 需要研究目标网站的html结构，找到需要数据所处的位置。
 * 2. 利用Crawler提供的服务端jQuery操作，取出html中的目标数据。
 * 3. 本例子中，需要首先抓取header，然后抓取每个header中的tab，之后抓取每个tab的列表。
 * 4. 将抓取的内容存入mongodb
 */

export default new class {
  constructor() {
    this.spider = new Crawler({
      rateLimit: 1000,
      maxConnections: 100,
      callback: (err, res, done) => {
        if (err) {
          console.error('there is no callback run, and the err is ', err);
        }
        done();
      }
    });

    this.spider.on('request', () => {
      console.log('spider request is ready');
      console.log('this.spider.size', this.spider.queueSize);
    });
  }

  enQueue = async (uri, cb) => new Promise((resolve, reject) => {
    this.spider.queue([{
      uri,
      callback: cb(resolve, reject)
    }]);
  });
};
