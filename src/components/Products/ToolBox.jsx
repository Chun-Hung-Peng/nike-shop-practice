import React, { Component } from 'react'
import { Row, Col, FormControl, Nav, Button } from 'react-bootstrap';
import { AiOutlineShoppingCart } from "react-icons/ai";



export default class ToolBox extends Component {
    render() {
        return (
            <div style={{ display: 'flex', justifyContent: 'center' }}>
                <Row style={{ width: '80%' }} className='align-items-center mt-4'>
                    <Col className='text-center'>SHOP</Col>
                    <FormControl as={Col} xs={8} type="text" placeholder="Search" />
                    <Button variant="outline-secondary">Clear</Button>
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
