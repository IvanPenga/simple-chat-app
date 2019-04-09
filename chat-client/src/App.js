import React, { Component } from 'react';
import './App.css';
import MessageContainer from './MessageContainer';
import SendButton from './SendButton';
import Sidebar from './Sidebar';
import { sendJoinRoom, subscribeBroadcast, sendGetUsers, subscribeDisconnect, subscribeNewConnection} from './ioSender';

class App extends Component {

  constructor(props){
    super(props);
    this.state = {
      user : props.user,
      messages : [],
    }

    sendJoinRoom(props.roomName);
    sendGetUsers();

    subscribeBroadcast((user, message) => {
      this.addMessage(message, user);
    });
    subscribeDisconnect((user) => {
      this.addMessage(`User ${user.name} has disconnected.`, { id : '', name : 'Server' });
    });
    subscribeNewConnection((user) => {
      this.addMessage(`User ${user.name} has connected.`, { id : '', name : 'Server' });
    });
  }

addMessage(message, user = this.state.user){
  this.setState(previousState => ({
    messages :  [...previousState.messages, { id : user.id, name : user.name, message : message }]
  }));
}

toggleSidebar(){
  this.refs.sidebarRef.setVisible(!this.refs.sidebarRef.isVisible());
}

  render() {
    return (
      <div className="App">
        <div className="sidebarButton" onClick={this.toggleSidebar.bind(this)}>
          <div className="sidebarIcon"/>
          <div className="sidebarIcon"/>
          <div className="sidebarIcon"/>
        </div>
        <p id="roomName">{this.props.roomName}</p>

        <Sidebar ref="sidebarRef"/>
        <MessageContainer messages={this.state.messages}/>
        <SendButton addMessage={this.addMessage.bind(this)}/>
      </div>
    )
  }
}

export default App;
