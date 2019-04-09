const express = require('express');
const http = require('http');
const socketIO = require('socket.io');

const names = require('./names');

const app = express();
const server = http.createServer(app);
const io = socketIO(server);

const port = 3001;
const addr = 'localhost';

const RoomModel = require('./models/Room');

var rooms = [];
const defaultRoom = 'lobby';
rooms[defaultRoom] = { users : [] };

app.get('/', function(req, res){
    res.end("It works!");
});

app.get('/rooms', async function(req, res){
    res.setHeader('Access-Control-Allow-Origin', '*');
    const users = await RoomModel.Room.findAll();
    console.log("Sending rooms to " + req.connection.remoteAddress);
    //TRY CATCH NEEDED!
    res.send(users);
});

app.get('/rooms/:id', async function(req, res){
    const users = await RoomModel.Room.findAll({ where : { id : req.params.id } });
    res.send(users);
});

io.on('connection', (socket) => {
    
    handleLogic(socket);

});

function registerUser(socket){
    var user = {
        id : socket.client.id,
        name : names.getName(),       
    };
    rooms[defaultRoom].users.push(user);
}

function handleJoin(socket){
    socket.on('joinRoom', (roomName) => {
        socket.join(roomName);  
    });
    handleLogic();
}

function handleLogic(socket){
    var user = {
        id : socket.client.id,
        name : names.getName(),       
    };

    socket.join(defaultRoom);   
    rooms[defaultRoom].users.push(user);

    socket.broadcast.emit('new_connection', user);
    socket.emit('welcome', user);
    console.log("Welcome! " + user.name);

    socket.on('message', (message) => {
        socket.to(defaultRoom).emit('broadcast', user, message);
    });

    socket.on('disconnect', () =>{
        rooms[defaultRoom].users = rooms[defaultRoom].users.filter((usr) => {
            return usr.id !== user.id;
        });
        socket.broadcast.emit('disconnection', user);
    });

    socket.on('get_users', () =>{
        socket.emit('user_list', rooms[defaultRoom].users);
    });
}

server.listen(port, () => {
    console.log(`Listening on port ${port}!`);
});