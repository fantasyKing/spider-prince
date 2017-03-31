import rq from 'request-promise';

export default new class {
  scratch = async (uri) => {
    try {
      const options = {
        method: 'GET',
        uri,
        json: true
      };
      const result = rq(options);
      return result;
    } catch (err) {
      console.error(err);
      throw err;
    }
  }
};
