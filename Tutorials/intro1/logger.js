const EventEmitter = require('events');

var url = 'https://mylogger.io/log';

//js class syntax
class Logger extends EventEmitter {
	log(message){
	//send http request
	console.log(message);
	//raise an event
	this.emit("logger", {message: "Hello from eventEmitter, this is a call from logger"});
	}
}


//make vars and func's public 
module.exports = Logger;

//pass single func:
//module.exports = log;
// console.log(module);
//or
//can name the exports.method anything, but must equal = log.
// module.exports.currLog = log;
//or
// module.exports.url = url;