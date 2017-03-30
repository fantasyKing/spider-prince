import EventEmitter from 'events';

class HandlerEvent extends EventEmitter {
  enQueue = (pro) => {
    this.emit('handle', pro);
  }

  // articleDetail = (item) => {
  //   this.emit('article', item);
  // }
}

export default HandlerEvent;
