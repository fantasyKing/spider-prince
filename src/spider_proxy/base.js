import spiderPrince from './../spider/spider_prince';

export default class {
  async scratch(uri) {
    try {
      if (!uri || typeof uri !== 'string') {
        throw new Error('uri must be string');
      }
      return await spiderPrince.enQueue(uri, this.callback);
    } catch (err) {
      console.log('spider err', err);
      throw err;
    }
  }
}
