import openSocket from 'socket.io-client';

//const socket = openSocket('http://93.138.33.56:3001');
const socket = openSocket('http://192.168.1.6:3001');

function sendMessage(message){
    socket.emit("message", message);
}

function sendGetUsers(){
    socket.emit("get_users");
}

function subscribeWelcome(callback){
    socket.on('welcome', (name) => {
        callback(name);
    });
}

function subscribeBroadcast(callback){    
    socket.on('broadcast', (user, message) => {
        callback(user, message);
    });
}

function subscribeNewConnection(callback){
    socket.on('new_connection', (user) => {
        callback(user);
    });
}

function subscribeDisconnect(callback){
    socket.on('disconnection', (user) => {
        callback(user);
    });
}

function subscribeUserList(callback){
    socket.on('user_list', (users) => {
        callback(users);
    });
}

export { sendMessage, subscribeWelcome, subscribeBroadcast, subscribeDisconnect, subscribeNewConnection, subscribeUserList, sendGetUsers }