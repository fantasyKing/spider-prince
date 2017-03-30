import EventEmitter from 'events';

import handler from './../spider_ctrl/handler';

class HandlerEvent extends EventEmitter {
  enQueue = async (pro) => {
    this.emit('handle', pro);
  }
}

const HandlerEventInstace = new HandlerEvent();

HandlerEventInstace.addListener('handle', handler.handle);

export default HandlerEventInstace;
