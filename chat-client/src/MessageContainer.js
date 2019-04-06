import React, { Component } from 'react';
import UserMessage from './UserMessage';
import './MessageContainer.css';

class MessageContainer extends Component{
    
    constructor(props){
        super(props);
        this.isDown = false;
    }

    componentWillUpdate(){
        const container = document.getElementById('messageCont');
        if (container){
            this.isDown = container.scrollHeight - container.clientHeight <= container.scrollTop + 1;
        }
    }

    componentDidUpdate(){
        const container = document.getElementById('messageCont');
        if (this.isDown){
            container.scrollTop = container.scrollHeight - container.clientHeight;
        } 
    }

    render(){
        return(
            <div id="messageCont" className="container">
                {
                      Object.keys(this.props.messages).map(function(key) {
                        return <UserMessage key={key} robo={this.props.messages[key].id} name={this.props.messages[key].name} message={this.props.messages[key].message}/>
                      }.bind(this))
                }                
            </div>
        )
    }
}

export default MessageContainer;