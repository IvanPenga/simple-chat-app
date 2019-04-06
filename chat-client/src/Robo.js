import React, {Component} from 'react';
import './Robo.css';
import Robo from 'react-robohash';

class RoboHash extends Component{
    render(){
        return(
            <Robo className="Robo" name={this.props.robo}/>
        )
    }
}

export default RoboHash;