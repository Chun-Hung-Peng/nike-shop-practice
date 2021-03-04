import React, { Component } from 'react'
import { withRouter } from 'react-router-dom';
import axios from '../../common/axios';
import { Button, Card } from 'react-bootstrap';
import { BsListUl } from "react-icons/bs";
import Panel from '../../common/Panel';
import EditInventory from '../EditInventory';
import { AiOutlineShopping } from "react-icons/ai";
import { toast } from 'react-toastify';


class Product extends Component {
    toEdit = () => {
        Panel.handleShow({
            props: {
                product: this.props.product,
                deleteProducts: this.props.deleteProducts
            },
            component: EditInventory,
            callback: (data) => {
                if (data) {
                    this.props.editProducts(data)
                }
            }
        })
    }
    addCar = async () => {
        if (!global.auth.isLogin()) {
            this.props.history.push('/login');
            toast.info('請先登入帳號');
            return;
        }
        try {
            const user = global.auth.getUser() || {};
            const { id, name, image, price } = this.props.product;
            const res = await axios.get('/carts', {
                params: {
                    productId: id,
                    userId: user.email
                }
            });
            const carts = res.data;
            if (carts && carts.length > 0) {
                const cart = carts[0];
                cart.mount += 1
                await axios.put(`/carts/${cart.id}`, cart);
            } else {
                const cart = {
                    productId: id,
                    name,
                    image,
                    price,
                    mount: 1,
                    userId: user.email
                };
                await axios.post('/carts', cart);
            }
            toast.success('新增成功')
            this.props.updateCarNum()
        } catch (error) {
            toast.success('新增失敗')
        }
    }
    renderManBtn = () => {
        const user = global.auth.getUser() || {}
        if (user.type === 1) {
            return (
                <div className='outOfEditButton'>
                    <Button className='editButton' variant="outline-none" onClick={this.toEdit}>
                        <BsListUl style={{ width: '25px', height: '25px' }} />
                    </Button>
                </div>
            )
        }
    }
    render() {
        const { name, image, tags, price, status } = this.props.product
        const stock = {
            available: true,
            unavailable: false
        }
        return (
            <Card>
                {this.renderManBtn()}
                <Card.Img variant="top" src={image} style={{ maxWidth: '400px', maxHeight: '400px' }} />
                <Card.Body>
                    <Card.Title>{name}</Card.Title>
                    <Card.Text>{tags}</Card.Text>
                </Card.Body>
                {stock[status] ?
                    (<Card.Footer className='outOfShopButton'>
                        {price}
                        <Button className='shopButton' variant="outline-none" onClick={this.addCar}>
                            <AiOutlineShopping style={{ width: '25px', height: '25px' }} />
                        </Button>
                    </Card.Footer>
                    )
                    : <Card.Footer className='outOfShopButton'>
                        目前無庫存
                            <Button className='shopButton' variant="outline-none" onClick={this.addCar}>
                            <AiOutlineShopping style={{ width: '25px', height: '25px' }} />
                        </Button></Card.Footer>
                }
            </Card>
        )
    }
}
export default withRouter(Product)