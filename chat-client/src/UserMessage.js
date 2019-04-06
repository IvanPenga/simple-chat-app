import React, { Component } from 'react';
import Message from './Message';
import Robo from './Robo';
import './UserMessage.css';

class UserMessage extends Component{
    
    render(){
        return(
            <div className="UserMessage">
                <Robo robo={this.props.robo}/><Message message={this.props.message} userName={this.props.name}/>
            </div>
        )
    }
}

export default UserMessage;