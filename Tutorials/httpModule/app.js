
const http = require('http');

const server = http.createServer((req, res) => {
	if(req.url === "/"){
		res.write("hello world");
		res.end();
	}

	if(req.url === "/hello"){
		res.write("Hello, I guess");
		res.end();
	}
});

// server.on("connection", (socket) => {
// 	console.log("New connection");
// });

server.listen(3000);

console.log("Listening on port 3000...");