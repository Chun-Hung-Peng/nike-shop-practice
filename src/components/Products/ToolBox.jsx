import React, { Component } from 'react'
import { Row, Col, FormControl, Nav, Button } from 'react-bootstrap';
import { AiOutlineShoppingCart } from "react-icons/ai";

export default class ToolBox extends Component {
    state = {
        searchText: ''
    }
    handleChange = e => {
        const value = e.target.value
        this.setState({
            searchText: value
        })
        this.props.searchProduct(value)
    }
    clearInput = () => {
        this.setState({ searchText: '' });
        this.props.searchProduct('')
    }
    render() {
        return (
            <div style={{ display: 'flex', justifyContent: 'center' }}>
                <Row style={{ width: '80%' }} className='align-items-center mt-4'>
                    <Col className='text-center'>SHOP</Col>
                    <Col xs={8}>
                        <FormControl type="text" placeholder="Search"
                            onChange={this.handleChange}
                            value={this.state.searchText}
                        />
                    </Col>
                    <Button variant="outline-secondary" onClick={this.clearInput}>Clear</Button>
                    <Col className='text-center'>
                        <Nav.Link style={{ color: 'black' }}>
                            <AiOutlineShoppingCart style={{ width: '25px', height: '25px' }} />
                        </Nav.Link>
                    </Col>
                </Row>
            </div>
        )
    }
}
