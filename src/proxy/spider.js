import { Article } from './../model/';

export default new class {
  /**
   * 保存文章到数据库
   * @param {json} article
   */
  saveArticle = async (article) => {
    try {
      const result = await Article.create(article);
      return result;
    } catch (err) {
      console.log('saveArticle err = ', err);
      throw err;
    }
  }

  /**
   * 查询文章是否已经被保存
   * @param {string} article_id
   */
  findOne = async (article_id) => {
    try {
      const result = await Article.findOne({ article_id }).exec();
      return !!result;
    } catch (err) {
      console.log('findOne err = ', err);
      throw err;
    }
  }
};
