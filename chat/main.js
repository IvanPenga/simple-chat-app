const express = require('express');
const http = require('http');
const socketIO = require('socket.io');

const names = require('./names');

const app = express();
const server = http.createServer(app);
const io = socketIO(server);

const port = 3001;
const addr = 'localhost';
//kriptirati poruke tako da korisnik ima kljuc, a server da otkljucava?

var rooms = [];
rooms['main_room'] = { id : 1, users : [] };

app.get('/', function(req, res){
    res.end("It works!");
});

io.on('connection', (socket) => {
    
    handleLogic(socket);

});

function handleLogic(socket){
    var user = {
        id : socket.client.id,
        name : names.getName(),       
    };

    socket.join('main_room');   
    rooms['main_room'].users.push(user);

    socket.broadcast.emit('new_connection', user);
    socket.emit('welcome', user);

    socket.on('message', (message) => {
        socket.to('main_room').emit('broadcast', user, message);
    });

    socket.on('disconnect', () =>{
        rooms['main_room'].users = rooms['main_room'].users.filter((usr) => {
            return usr.id !== user.id;
        });
        socket.broadcast.emit('disconnection', user);
    });

    socket.on('get_users', () =>{
        socket.emit('user_list', rooms['main_room'].users);
    });
}

server.listen(port, () => {
    console.log(`Listening on port ${port}!`);
});