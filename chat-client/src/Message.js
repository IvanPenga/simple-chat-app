import React, { Component } from 'react';
import './Message.css';

class Message extends Component{

    getColor(value){
        if (value === 'Server'){
            return 'rgb(69, 226, 121)';
        }
        return 'lightblue';
    }

    render(){
        return(
            <div className="Message" style={{backgroundColor:this.getColor(this.props.userName)}}>
                <p>{this.props.userName}</p>
                 {this.props.message}
             </div>
        )
    }
}

export default Message;