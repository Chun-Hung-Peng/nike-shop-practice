import React, { Component } from 'react'
import { Button, Form } from 'react-bootstrap';
import { toast } from 'react-toastify';
import axios from '../../common/axios';


class AddInventory extends Component {
    state = {
        name: '',
        price: '',
        tag: '',
        image: '',
        status: 'availalbe'
    }
    handleChange = e => {
        const value = e.target.value;
        const name = e.target.name;
        this.setState({
            [name]: value
        })
    }
    formSubmit = e => {
        e.preventDefault()
        const product = { ...this.state }
        axios.post('products', product).then(res => {
            this.props.handleClose(res.data);
            toast.success('成功提交表單！')
        })
    }
    render() {
        return (
            <Form className='mx-4 my-4' onSubmit={this.formSubmit}>
                <Form.Group controlId="exampleForm.ControlInput1">
                    <Form.Label>Name</Form.Label>
                    <Form.Control onChange={this.handleChange} name='name' as="textarea" type="text" placeholder="商品名稱" />
                </Form.Group>
                <Form.Group controlId="exampleForm.ControlInput2">
                    <Form.Label>Price</Form.Label>
                    <Form.Control onChange={this.handleChange} name='price' type="text" placeholder="商品價格" />
                </Form.Group>
                <Form.Group controlId="exampleForm.ControlInput3">
                    <Form.Label>Tag</Form.Label>
                    <Form.Control onChange={this.handleChange} name='tag' type="text" placeholder="商品標籤" />
                </Form.Group>
                <Form.Group controlId="exampleForm.ControlInput4">
                    <Form.Label>Image</Form.Label>
                    <Form.Control onChange={this.handleChange} name='image' type="text" placeholder="商品圖片" />
                </Form.Group>
                <Form.Group controlId="exampleForm.ControlInput5">
                    <Form.Label>Available</Form.Label>
                    <Form.Control onChange={this.handleChange} name='status' as="select">
                        <option>available</option>
                        <option>unavailable</option>
                    </Form.Control>
                </Form.Group>
                <div className='text-right'>
                    <Button variant="secondary" type='button' onClick={() => { this.props.handleClose() }}>Close</Button>
                    <Button variant="primary" type='submit' onClick={this.formSubmit}>Submit</Button>
                </div>
            </Form>

        )
    }
}

export default AddInventory