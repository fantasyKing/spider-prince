export default {
  uri: 'http://www.dongqiudi.com',
  mongo: {
    spider: {
      uri: 'mongodb://localhost/spider',
      sid: 'spider',
      options: {
        db: { native_parser: true },
        server: {
          poolSize: 5,
          auto_reconnect: true,
          socketOptions: {
            keepAlive: 1
          }
        },
        user: 'spider',
        pass: 'prince'
      },
      dbs: [{
        name: 'spider',
        default: true
      }]
    }
  }
};
