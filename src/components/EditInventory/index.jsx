import React, { Component } from 'react'
import { Button, Form } from 'react-bootstrap';
import { toast } from 'react-toastify';
import axios from '../../common/axios';


class EditInventory extends Component {
    state = {
        id: '',
        name: '',
        image: '',
        price: '',
        tags: '',
        status: 'availalbe'
    }
    componentDidMount() {
        const { id, name, image, tags, price, status } = this.props.product;
        this.setState({
            id, name, image, tags, price, status
        })
    }
    handleChange = e => {
        const value = e.target.value;
        const productName = e.target.name;
        this.setState({
            [productName]: value
        })
    }
    formSubmit = e => {
        e.preventDefault()
        const product = { ...this.state }
        axios.put(`products/${this.state.id}`, product).then(res => {
            this.props.handleClose(res.data);
            toast.success('成功修改表單！')
        })
    }
    formDelete = () => {
        axios.delete(`products/${this.state.id}`).then(res => {
            this.props.deleteProducts(this.state.id);
            toast.success('成功刪除表單！')
        })
    }
    render() {
        return (
            <Form className='mx-4 my-4' onSubmit={this.formSubmit}>
                <Form.Group controlId="exampleForm.ControlInput1">
                    <Form.Label>Name</Form.Label>
                    <Form.Control defaultValue={this.state.name} onChange={this.handleChange} name='name' as="textarea" type="text" placeholder="商品名稱" />
                </Form.Group>
                <Form.Group controlId="exampleForm.ControlInput2">
                    <Form.Label>Price</Form.Label>
                    <Form.Control defaultValue={this.state.price} onChange={this.handleChange} name='price' type="text" placeholder="商品價格" />
                </Form.Group>
                <Form.Group controlId="exampleForm.ControlInput3">
                    <Form.Label>Tags</Form.Label>
                    <Form.Control defaultValue={this.state.tags} onChange={this.handleChange} name='tags' type="text" placeholder="商品標籤" />
                </Form.Group>
                <Form.Group controlId="exampleForm.ControlInput4">
                    <Form.Label>Image</Form.Label>
                    <Form.Control defaultValue={this.state.image} onChange={this.handleChange} name='image' type="text" placeholder="商品圖片" />
                </Form.Group>
                <Form.Group controlId="exampleForm.ControlInput5">
                    <Form.Label>Available</Form.Label>
                    <Form.Control defaultValue={this.state.status} onChange={this.handleChange} name='status' as="select">
                        <option>available</option>
                        <option>unavailable</option>
                    </Form.Control>
                </Form.Group>
                <div className='text-center'>
                    <Button variant="secondary" type='button' onClick={() => { this.props.handleClose() }}>Close</Button>{' '}
                    <Button variant="primary" type='submit' onClick={this.formSubmit}>Submit</Button>{' '}
                    <Button variant="danger" type='button' onClick={() => { this.formDelete() }}>Delete</Button>{' '}
                </div>
            </Form>

        )
    }
}

export default EditInventory