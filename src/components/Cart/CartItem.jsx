import React, { useState, useMemo } from 'react';
import axios from '../../common/axios';
import { Row, Col, Image, FormControl } from 'react-bootstrap';


const CartItem = props => {
    const [mount, setMount] = useState(props.cart.mount);
    const { id, name, image, price } = props.cart || {}
    const sumPrice = useMemo(() => {
        return price.substr(1) * mount
    }, [mount, price])

    const handleMount = e => {
        const _mount = e.target.value
        setMount(_mount)
        const newCart = {
            ...props.cart,
            mount: _mount
        }
        axios.put(`/carts/${id}`, newCart).then(res => {
            props.updateCatrs(newCart)
        })
    }
    const deleteCart = () => {
        axios.delete(`/carts/${id}`).then(res => {
            props.deleteCart(props.cart)
        })
    }

    return (
        <div>
            <Row className="align-items-center">
                <Col xs={6}>
                    <button className='noneButton' onClick={deleteCart}>x</button>
                    <Image src={process.env.PUBLIC_URL + image} alt={name} className='prodcut-info' style={{ width: '100px', margin: '0 30px' }} />
                    <p className='prodcut-info'>{name}</p>
                </Col>
                <Col><span className="price">{price}</span></Col>
                <Col>
                    <FormControl
                        className='num-input'
                        defaultValue={mount}
                        onChange={handleMount}
                        min={1}
                        type='number'
                    />
                </Col>
                <Col>總金額：${sumPrice}</Col>
            </Row>
        </div>
    );
}

export default CartItem;
