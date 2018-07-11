var express = require("express")
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var namer = require('color-namer');
const port = 3000;
const hostname = '127.0.0.1';

//set up public folder
app.use(express.static("public"));

var users = [];
var connections = [];

app.set("view engine", "ejs");

app.set('views', '.'); //tell program where to look for views. 

app.get('/', function(req, res){
    res.render('index.ejs');
});

io.sockets.on('connection', function(socket){
  console.log("a user has connected");
  connections.push(socket);
  console.log('Connected: %s sockets connected', connections.length);
  
  socket.on('disconnect', function(){
    users.splice(users.indexOf(socket.username), 1);
    updateUsernames();
    
    connections.splice(connections.indexOf(socket), 1);
    console.log('Disconnected: %s sockets remaining', connections.length);
    });
    
    socket.on('chat message', function(data){
       console.log("Message: " + data);
       io.sockets.emit('chat message', {msg: data, user: socket.username, msgColor: socket.messageColor});
   });
   
   socket.on('new user', function(nickName, messageColor, callback){
        callback(true); 
        socket.username = nickName;
        socket.messageColor = messageColor;
        newColorName(messageColor);
        console.log(socket.messageColor);
        users.push(socket.username);
        updateUsernames();
    });
    
    var colorCallCounter = 0;
    
    function newColorName(messageColor){
        var colorName = namer(messageColor);
        var newColorName = colorName.x11[3].name;
        socket.emit('userColor', {color:newColorName, callCount:colorCallCounter}); //name color
        colorCallCounter++;
    }
    
    socket.on('new color', function(newColor){
        socket.messageColor = newColor;
        newColorName(newColor);
    });
    
    socket.on('user typing', function(data){
        io.sockets.emit('userType', {user: users[users.indexOf(data)]});
    });
    
    function updateUsernames(){
    io.sockets.emit('get users', users);
    }
  
});


http.listen(port, hostname, function(){
   console.log("Twixt Chat!"); 
});