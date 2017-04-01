export default {
  uri: 'http://www.dongqiudi.com',
  mongo: {
    spider: {
      uri: 'mongodb://192.168.202.210,192.168.202.211/spider',
      sid: 'spider',
      options: {
        db: { native_parser: true },
        server: {
          poolSize: 10,
          auto_reconnect: true,
          socketOptions: {
            keepAlive: 1
          }
        },
        user: 'spider',
        pass: 'spider'
      },
      dbs: [{
        name: 'spider',
        default: true
      }]
    }
  }
};
