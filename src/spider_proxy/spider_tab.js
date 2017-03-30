import Base from './base';
import config from './../config';

export default new class extends Base {
  callback(resolve, reject) {
    return (err, res, done) => {
      if (err) {
        done();
        return reject(err);
      }
      const $ = res.$;
      const tabs = $('#tab a');
      const tabsArr = tabs.map(function each() {
        return `${config.uri}${$(this).attr('href')}`;
      }).get();
      resolve(tabsArr);
      return done();
    };
  }
};
