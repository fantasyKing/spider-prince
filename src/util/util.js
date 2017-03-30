import config from './../config';

export default new class {
  /**
   * tabUri中剥离出tab index
   * tabUri = ?tab=1
   */
  __getTabIndex = (tabUri) => tabUri.match(/\d+/i)[0];

  getArchivesUrls = (tabUri) => {
    if (!tabUri || typeof tabUri !== 'string') {
      return '';
    }
    const archivePrefix = `${config.uri}/archives/${this.__getTabIndex(tabUri)}?page=`;
    let i = 0;
    const result = [];
    while (i !== 100) {
      result.push(`${archivePrefix}i`);
      i++;
    }
    return result;
  }

  filter = (item, required) => {
    const obj = {};
    required = required || [];
    item = item || {};
    for (const key of required) {
      if (key === 'url') {
        obj[key] = `${config.uri}/article/${item.id}`;
        continue;
      }
      obj[key] = item[key] || '';
    }
    return obj;
  }
};
