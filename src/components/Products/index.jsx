import React, { Component } from 'react';
import ToolBox from './ToolBox';
import Product from './Product';
import axios from '../../common/axios';
import Panel from '../../common/Panel';
import AddInventory from '../AddInventory';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import { Row, Col, Button } from 'react-bootstrap';

class Products extends Component {
    state = {
        product: [],
        sourceProduct: [],
        carNumber: 0
    }
    componentDidMount() {
        axios.get('/products').then(response => {
            this.setState({
                product: response.data,
                sourceProduct: response.data,
            })
        })
        this.updateCarNum()
    }
    searchProduct = text => {
        let _product = [...this.state.sourceProduct]
        _product = _product.filter(p => {
            const matchArray = p.name.match(new RegExp(text, 'gi'))
            return matchArray !== null
        })
        this.setState({
            product: _product
        })
    }
    toAdd = () => {
        Panel.handleShow({
            component: AddInventory,
            callback: data => {
                if (data) {
                    this.renewProducts(data)
                }
            }
        })
    }
    renewProducts = newproduct => {
        const _products = [...this.state.product]
        const _sproducts = [...this.state.sourceProduct]
        _products.push(newproduct)
        this.setState({
            product: _products,
            sourceProduct: _sproducts
        })
    }
    editProducts = editProduct => {
        const _products = [...this.state.product]
        const _index = _products.findIndex(p => p.id === editProduct.id)
        _products.splice(_index, 1, editProduct)
        const _sproducts = [...this.state.product]
        const _sindex = _sproducts.findIndex(p => p.id === editProduct.id)
        _sproducts.splice(_sindex, 1, editProduct)
        this.setState({
            product: _products,
            sourceProduct: _sproducts
        })
    }
    deleteProducts = id => {
        const _products = this.state.product.filter(p => p.id !== id)
        const _sproducts = this.state.sourceProduct.filter(p => p.id !== id)
        this.setState({
            product: _products,
            sourceProduct: _sproducts
        })
    }
    updateCarNum = async () => {
        const carNum = await this.getCarNum()
        this.setState({
            carNumber: carNum
        })
    }
    getCarNum = async () => {
        const user = global.auth.getUser() || {};
        const res = await axios.get('/carts', {
            params: {
                userId: user.email
            }
        })
        const carts = res.data || []
        const cartNum = carts
            .map(cart => Number(cart.mount))
            .reduce((a, value) => a + value, 0)
        return cartNum
    }
    render() {
        return (
            <div>
                {
                    (global.auth.getUser() || {}).type === 1 && (
                        <div className='addButton'>
                            <Button variant="dark" onClick={this.toAdd}>添加產品</Button>
                        </div>
                    )
                }
                <ToolBox searchProduct={this.searchProduct} carNumber={this.state.carNumber} />
                <Row className='mx-4'>
                    <TransitionGroup component={null}>
                        {
                            this.state.product.map(p => {
                                return (
                                    <CSSTransition classNames='product-fade' timeout={300} key={p.id + p.name}>
                                        <Col className='mt-4' xs={3} key={p.id + p.name} >
                                            <Product
                                                product={p}
                                                editProducts={this.editProducts}
                                                deleteProducts={this.deleteProducts}
                                                updateCarNum={this.updateCarNum}
                                            />
                                        </Col>
                                    </CSSTransition>
                                )
                            })
                        }
                    </TransitionGroup>
                </Row>
            </div>
        );
    }
}

export default Products;
