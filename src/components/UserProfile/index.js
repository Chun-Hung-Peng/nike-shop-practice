import React from 'react'
import { Button, Form, Nav } from 'react-bootstrap';

export default function UserProfile(props) {
    const logOut = () => {
        global.auth.logOut()
        props.handleClose('logout')
        props.history.push('./products')
        props.history.go(0)
    }
    return (
        <Nav className="justify-content-center">
            <Form style={{ width: '400px', marginTop: '2rem', marginBottom: '2rem' }}>
                <Form.Group controlId="formBasicName">
                    <Form.Label>用戶名稱：</Form.Label>
                    <Form.Control
                        type="text"
                        name='name'
                        defaultValue={props.user.nickname}
                    />
                </Form.Group>
                <Form.Group controlId="formBasicEmail">
                    <Form.Label>用戶信箱：</Form.Label>
                    <Form.Control
                        type="email"
                        name='email'
                        defaultValue={props.user.email}
                    />
                </Form.Group>
                <Form.Group controlId="formBasicType">
                    <Form.Label>用戶類型：</Form.Label>
                    <Form.Control
                        type="text"
                        name='type'
                        defaultValue={props.user.type === 1 ? '管理者' : '一般用戶'}
                    />
                </Form.Group>
                <div className='text-right'>
                    <Button variant="secondary" type='button' onClick={props.handleClose}>Close</Button>
                    <Button variant="primary" type='button' onClick={logOut} >登出</Button>
                </div>
            </Form>
        </Nav>
    )
}
