import React, { Component } from 'react';
import ToolBox from './ToolBox';
import Product from './Product';
import axios from '../../common/axios';
import { Row, Col } from 'react-bootstrap';

class Products extends Component {
    state = {
        product: []
    }
    componentDidMount() {
        axios.get('/products').then(response => {
            this.setState({
                product: response.data
            })
        })
    }
    render() {
        return (
            <div>
                <ToolBox />
                <Row className='mx-4'>
                    {
                        this.state.product.map(p => {
                            return (<Col className='mt-4' xs={3} key={p.id + p.name} ><Product product={p} /></Col>)
                        })
                    }
                </Row>
            </div>
        );
    }
}

export default Products;
