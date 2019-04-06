import React, { Component } from 'react';
import { subscribeUserList, subscribeNewConnection, subscribeDisconnect} from './ioSender';
import './Sidebar.css';
import UserMessage from './UserMessage';

class Sidebar extends Component{
    
    constructor(props){
        super(props);
        this.state = {
            visible : false,
            users : []
        }
        subscribeUserList((users) => {
            this.setState(previousState => ({
                users :  users
            }));
            console.log(this.state);
        });
        subscribeNewConnection((user) => {
            this.addUser(user);
        });
        subscribeDisconnect((user) => {
            this.removeUser(user);
        });
    }

    addUser(user){
        this.setState(previousState => ({
            users :  [...previousState.users, { id : user.id, name : user.name }]
        }));
    }

    removeUser(user){
        this.setState(previousState => ({
            users :  this.state.users.filter(usr => usr.id !== user.id)
        }));
    }

    setVisible(visible){
        this.setState({ visible : visible });
    }

    isVisible(){
        return this.state.visible;
    }

    render(){
        return(
                <div id="sidebar" style={{width : this.state.visible ? '100%' : '0%'}}>
                    <div style={{ marginTop : "60px" }}>
                    <p id="onlineUsers">Online Users</p>
                    {
                        Object.keys(this.state.users).map(function(key) {
                            return <UserMessage key={key} robo={this.state.users[key].id} message={this.state.users[key].name} name={this.state.users[key].id} />
                        }.bind(this))
                    }
                    </div>
                </div>
        )
    }
}

export default Sidebar;