import Base from './base';

export default new class extends Base {
  callback(resolve, reject) {
    return (err, res, done) => {
      if (err) {
        done();
        return reject(err);
      }
      const $ = res.$;
      const article = $('div.detail').text();
      resolve(article.replace(/\s/g, ''));
      return done();
    };
  }
};
