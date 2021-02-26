import React, { Component } from 'react'
import axios from '../../common/axios';
import { Button, Card } from 'react-bootstrap';
import { BsListUl } from "react-icons/bs";
import Panel from '../../common/Panel';
import EditInventory from '../EditInventory';
import { AiOutlineShopping } from "react-icons/ai";
import { toast } from 'react-toastify';


export default class Product extends Component {
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
        try {
            const { id, name, image, price } = this.props.product
            const res = await axios.get(`/carts?productId=${id}`)
            const carts = res.data
            if (carts && carts.length > 0) {
                const cart = carts[0]
                cart.mount = + 1
                axios.put(`/carts??productId=${id}`)
            } else {
                const cart = {
                    productId: id,
                    name, image, price,
                    mount: 1
                }
                await axios.post('./carts', cart)
            }
            toast.success('新增成功')
        } catch (error) {
            toast.success('新增失敗')
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
                <div className='outOfEditButton'>
                    <Button className='editButton' variant="outline-none" onClick={this.toEdit}>
                        <BsListUl style={{ width: '25px', height: '25px' }} />
                    </Button>
                </div>
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
