import article from './article';
import config from '../../config';
import mongoDB from './../../util/mongodb/';

const schemas = [
  article
];

const models = mongoDB(config.mongo, schemas);

export default models;
