import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import Login from './Login';
import * as serviceWorker from './serviceWorker';
import { subscribeWelcome } from './ioSender';

var user;

function onLogIn(roomName){
    console.log(roomName);
    ReactDOM.render(<App user={user} roomName={roomName}/>, document.getElementById('root'));
}

const loginComponent = <Login onLogIn={onLogIn.bind(this)}/>

subscribeWelcome((_user) => {
    user = _user;
    ReactDOM.render(loginComponent, document.getElementById('root'));
});



serviceWorker.unregister();
