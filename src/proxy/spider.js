import { Article } from './../model/';

export default new class {
  saveArticle = async (article) => {
    try {
      const result = await Article.create(article);
      return result;
    } catch (err) {
      console.log('saveArticle err = ', err);
      throw err;
    }
  }
};
