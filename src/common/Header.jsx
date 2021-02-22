import React from 'react';
import { Navbar, Nav, Button } from 'react-bootstrap';
import { BsFillPersonFill } from "react-icons/bs";
import { Link } from 'react-router-dom';


const Header = props => {
    return (
        <Navbar bg="dark" variant="dark">
            <Navbar.Brand className="ml-4" >Nike</Navbar.Brand>
            <Nav className="mr-auto">
                <Nav.Link as={Link} to="/home" >首頁</Nav.Link>
                <Nav.Link as={Link} to="/products" >產品</Nav.Link>
            </Nav>
            {
                props.nickname ? (
                    <Nav className="ml-auto">
                        <BsFillPersonFill style={{ height: '32px', width: '32px', marginTop: '5px' }} />
                        <Button className="mr-4" variant="dark">{props.nickname}
                        </Button>
                    </Nav>) :
                    (
                        <Nav className="ml-auto">
                            <Button as={Link} to="/login" variant="dark">註冊</Button>
                            <Button as={Link} to="/login" className="mr-4" variant="dark">登入</Button>
                        </Nav>)
            }
        </Navbar>
    );
}

export default Header;

