//Global objects in Node

// console.log("hello");

// setTimeout();
// clearTimeout();

// setInterval();
// celarInterval();

//all these functions can be called with the window prefix (e.g. window.setInterval())
//In Node, we have the global object. (e.g. global.setTimeout())

// console.log(module); //prints module object with key values

//load module and use public param's

// import module
// logger is set to the exports param of the logger module
const logger = require('./logger');

//use the methods on logger obj.
logger.log("hello");

console.log(__dirname);

//use a method that was passed directly:
//logger("hello") //defaults to log function

// log("hello");