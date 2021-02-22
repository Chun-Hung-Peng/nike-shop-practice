import React, { Component } from 'react'
import { Card } from 'react-bootstrap';

export default class Product extends Component {
    render() {
        const { name, image, tag, price, status } = this.props.product
        const stock = {
            available: true,
            unavailable: false
        }
        return (
            <Card>
                <Card.Img variant="top" src={image} style={{ maxWidth: '400px', maxHeight: '400px' }} />
                <Card.Body>
                    <Card.Title>{name}</Card.Title>
                    <Card.Text>{tag}</Card.Text>
                </Card.Body>
                {stock[status] ?
                    (<Card.Footer>{price}</Card.Footer>)
                    : <Card.Footer>目前無庫存</Card.Footer>
                }
            </Card>
        )
    }
}
