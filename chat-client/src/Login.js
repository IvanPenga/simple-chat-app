import React, { Component } from 'react';
import Room from './Room';
import './Login.css';

class Login extends Component {

    constructor(props){
        super(props);
        this.state = {
            rooms : []
        }
        this.getRooms();
    }

    onRoomClick(roomName){
        this.props.onLogIn(roomName);
    }

    getRooms(){
        fetch("http://192.168.1.6:3001/rooms")
        .then(res => res.json())
        .then((result) =>{
            this.setState({rooms:result});
        });
    }

    render(){
        return(
            <div>
                {
                      Object.keys(this.state.rooms).map(function(key) {
                        return <Room key={key} name={this.state.rooms[key].name} onRoomClick={this.onRoomClick.bind(this)}/>
                      }.bind(this))
                }     
            </div>
        )
    }

}

export default Login;