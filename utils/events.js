const EventEmitter = require("events");

class CustomEmitter extends EventEmitter {
    type = 'default'
    constructor(type) {
        super();
        this.type = type
    }
    log(data) {
        this.emit(this.type, data);
    }

}

module.exports = CustomEmitter
