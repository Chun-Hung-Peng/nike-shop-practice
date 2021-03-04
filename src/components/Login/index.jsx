import React from 'react';
import axios from '../../common/axios';
import { Form, Button, Nav } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';

export default function Login(props) {
    const { register, handleSubmit, errors } = useForm()

    const loginSubmit = async data => {
        try {
            const { email, password } = data
            const res = await axios.post('/auth/login', { email, password })
            const jwToken = res.data
            global.auth.setToken(jwToken)
            toast.success('成功登入')
            props.history.push('./products')
            props.history.go(0)
        } catch (error) {
            toast.error('請重新輸入信箱和密碼');
        }
    }
    return (
        <Nav className="justify-content-center">
            <Form style={{ width: '400px', marginTop: '10rem' }} onSubmit={handleSubmit(loginSubmit)}>
                <Form.Group controlId="formBasicEmail">
                    <Form.Label>信箱</Form.Label>
                    <Form.Control
                        type="email"
                        name='email'
                        placeholder="Enter email"
                        ref={register({
                            required: '請輸入信箱',
                            pattern: {
                                value: /^[A-Za-z0-9]+([_\\.][A-Za-z0-9]+)*@([A-Za-z0-9\\-]+\.)+[A-Za-z]{2,6}$/,
                                message: '信箱格式錯誤' // JS only: <p>error message</p> TS only support string
                            }
                        })}
                    />
                    {
                        errors.email && (<Form.Text className="text-muted" >{errors.email.message}</Form.Text>)
                    }
                </Form.Group>
                <Form.Group controlId="formBasicPassword">
                    <Form.Label>密碼</Form.Label>
                    <Form.Control
                        type="password"
                        name='password'
                        placeholder="Password"
                        ref={register({
                            required: '請輸入密碼',
                            minLength: {
                                value: 6,
                                message: '密碼不能少於六位'
                            }
                        })}
                    />
                    {
                        errors.password && (<Form.Text className="text-muted" >{errors.password.message}</Form.Text>)
                    }
                </Form.Group>
                <Nav className='justify-content-end'>
                    <Button variant="primary" type="submit">登入</Button>
                </Nav>
            </Form>
        </Nav>
    )
}
