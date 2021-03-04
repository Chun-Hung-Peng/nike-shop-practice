import React from 'react';
import axios from '../../common/axios';
import { Form, Button, Nav } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';

export default function Login(props) {
  const { register, handleSubmit, errors } = useForm();

  const onSubmit = async data => {
    try {
      const { nickname, email, password } = data;
      const res = await axios.post('/auth/register', {
        nickname,
        email,
        password,
        type: 0
      });
      const jwToken = res.data;
      global.auth.setToken(jwToken);
      toast.success('Register Success');
      props.history.push('./products')
      props.history.go(0)
    } catch (error) {
      const message = error.response.data.message;
      toast.error(message);
    }
  };

  return (
    <Nav className="justify-content-center">
      <Form style={{ width: '400px', marginTop: '10rem' }} onSubmit={handleSubmit(onSubmit)}>
        <Form.Group controlId="formBasicNickname">
          <Form.Label>用戶名稱</Form.Label>
          <Form.Control
            type="text"
            name='nickname'
            placeholder="Enter nickname"
            ref={register({
              required: '請輸入用戶名稱'
            })}
          />
          {
            errors.nickname && (<Form.Text className="text-muted" >{errors.nickname.message}</Form.Text>)
          }
        </Form.Group>
        <Form.Group controlId="formBasicEmail">
          <Form.Label>信箱</Form.Label>
          <Form.Control
            type="text"
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
            placeholder="Enter password"
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
          <Button variant="primary" type="submit">註冊</Button>
        </Nav>
      </Form>
    </Nav>
  );
}
