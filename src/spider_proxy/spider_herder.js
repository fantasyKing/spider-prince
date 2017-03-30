import Base from './base';

export default new class extends Base {
  callback(resolve, reject) {
    return (err, res, done) => {
      if (err) {
        done();
        return reject(err);
      }
      done();
      const $ = res.$;
      return resolve($('a'));
    };
  }
};
