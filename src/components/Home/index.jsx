import React, { Component } from 'react';
import Image from 'react-bootstrap/Image'
import backgroundlogo from './backgroundlogo.jpg';

class Home extends Component {
    render() {
        return (
            <Image src={backgroundlogo} style={{ maxWidth: '100%', maxHeight: '100%' }} />
        );
    }
}

export default Home;
