import React, { Component } from 'react';
import { sendMessage } from './ioSender';
import './SendButton.css';

class SendButton extends Component{

    createMessage(e)
    {    
        var messageText = this.refs.messageInputRef.value;
        this.refs.messageInputRef.value = '';
        e.preventDefault();

        if (messageText !== '' && messageText !== null){
            this.props.addMessage(messageText);
            sendMessage(messageText);   
        }
    }
    
    render(){
        return(
            <div className="formContainer">
                <form autoComplete="off" onSubmit={e => this.createMessage(e)}>
                    <input autoComplete="off" ref="messageInputRef" type="text" id="messageToSend" name="message" placeholder="Message"/>
                </form>
            </div>
        )
    }
}

export default SendButton;