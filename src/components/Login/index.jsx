import React, { Component } from 'react';
import { Form, Button, Nav } from 'react-bootstrap';


class Login extends Component {
    state = {
        email: '',
        password: ''
    }
    handleSubmit = e => {
        e.preventDefault();
        this.props.history.push('/home')
    }
    render() {
        return (
            <Nav className="justify-content-center">
                <Form style={{ width: '400px', marginTop: '40px' }}>
                    <Form.Group controlId="formBasicEmail">
                        <Form.Label>信箱</Form.Label>
                        <Form.Control
                            type="email"
                            placeholder="Enter email"
                            onChange={(event) => this.setState({ email: event.target.value })}
                        />
                        <Form.Text className="text-muted" >
                            請輸入帳號信箱
                        </Form.Text>
                    </Form.Group>
                    <Form.Group controlId="formBasicPassword">
                        <Form.Label>密碼</Form.Label>
                        <Form.Control
                            type="password"
                            placeholder="Password"
                            onChange={(event) => this.setState({ password: event.target.value })}
                        />
                    </Form.Group>
                    <Button onClick={this.handleSubmit} variant="primary" type="submit">
                        登入
                        </Button>
                </Form>
            </Nav>
        );
    }
}

export default Login;
