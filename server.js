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

var boomcount = 0;

io.on('connect', function(socket){
  console.log('io got connect, socket is: ', socket.id, socket.adapter.rooms);
  socket.on('disconnect', function() {
    console.log('socket disco', socket.id, socket.adapter, socket.adapter ? socket.adapter.rooms: null)
  })
  socket.on('roomy',function(){
    socket.join('boomishly');
    io.to('boomishly').emit('welcome to boomishly')
  })
});

setInterval(function(){
  console.log('interval fired...', boomcount);
  io.to('boomishly').emit('boomcount: '+boomcount++)
},1000)


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