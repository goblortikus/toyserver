var util        = require('util');

var express     = require('express');
var cors        = require('cors');

var app         = express();
    app.use(cors());

var server      = require('http').Server(app);
var io          = require('socket.io')(server, { origins: '*:*', 
                                                 perMessageDeflate: false, 
                                                 httpCompression: false 
                                               });
    io.origins('*:*');
    io.set("origins", "*:*");
//var config      = require('./config/app');

var DEBUG = true;

io.on('connect', function(socket){
  console.log('io got connect, socket is: ', socket.id, socket.adapter.rooms);
  socket.on('disconnect', function(socket) {
    console.log('socket disco', socket.id, socket.adapter.rooms)
  })
});



app.get('/', function (req, res) {
  res.send('Hello World!')
});

server.listen(4099, function(){
  console.log('express listening on 4099')
});

// var app = require('express')();
// var server = require('http').Server(app);
// var io = require('socket.io')(server);

// server.listen(4099)

// app.get('/', function (req, res) {
//   res.sendfile(__dirname + '/index.html');
// });

// io.on('connection', function (socket) {
//   socket.emit('news', { hello: 'world' });
//   socket.on('my other event', function (data) {
//     console.log(data);
//   });
// });