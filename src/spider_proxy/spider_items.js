import Base from './base';
import config from './../config';

export default new class extends Base {
  /**
   * @param {promise} resolve
   * @param {promise} reject
   * @return [{ title, url, description, display_time, thumb, type }]
   */
  callback(resolve, reject) {
    return async (err, res, done) => {
      if (err) {
        done();
        return reject(err);
      }
      const $ = res.$;
      const items = $('#news_list li').map(function each() {
        const titleEle = $(this).find('h2 a');
        const title = titleEle.text();
        const url = titleEle.attr('href');
        const description = $(this).find('p').text();
        const display_time = $(this).find('.info span').text();
        const thumb = $(this).find('img').attr('src');
        return { title, url: `${config.uri}${url}`, description, display_time, thumb };
      }).get();
      resolve(items);
      return done();
    };
  }
};
