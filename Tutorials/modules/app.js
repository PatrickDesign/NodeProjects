
// const path = require('path');

// const pathObj = path.parse(__filename);

// console.log(pathObj);
// pathObj{
// 	root: x,
// 	dir: x,
// 	base: fileName,
// 	ext: .js,
// 	name: fileName w/o ext
// }

const EventEmitter = require('events');



const Logger = require('../intro1/logger');

const logger = new Logger();

logger.on("logger", (arg) => {
	console.log(`Current message is: ${arg.message}`);
});

logger.log('Hello from app.js');
