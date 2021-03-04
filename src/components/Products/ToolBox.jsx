import React, { Component } from 'react'
import { withRouter } from 'react-router-dom';
import { Row, Col, FormControl, Button } from 'react-bootstrap';
import { AiOutlineShoppingCart } from "react-icons/ai";
import { toast } from 'react-toastify';

class ToolBox extends Component {
    state = {
        searchText: '',
        carNumber: 0
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

    goCart = () => {
        if (!global.auth.isLogin()) {
            this.props.history.push('/login');
            toast.info('請先登入帳號');
            return;
        }
        this.props.history.push('/cart');
    };
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
                        <Button className='noneButton' variant="outline-none" onClick={this.goCart} style={{ color: 'black', marginTop: '5px' }}>
                            <AiOutlineShoppingCart style={{ width: '25px', height: '25px' }} />
                            <p style={{ display: 'inline-block', marginLeft: '10px' }}>({this.props.carNumber})</p>
                        </Button>
                    </Col>
                </Row>
            </div>
        )
    }
}
export default withRouter(ToolBox);
