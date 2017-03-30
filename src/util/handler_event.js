import EventEmitter from 'events';

class HandlerEvent extends EventEmitter {
  enQueue = async (pro) => {
    this.emit('handle', pro);
  }
}

export default HandlerEvent;
