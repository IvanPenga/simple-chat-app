import React, { Component } from 'react';
import './Room.css';

class Room extends Component {

    roomClick(){
        this.props.onRoomClick(this.props.name);
    }

    render(){
        return(
            <div className="room" onClick={ this.roomClick.bind(this) }>
                {this.props.name}                
            </div>
        )
    }

}

export default Room;