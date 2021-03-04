import React from 'react';
import { Navbar, Nav, Button } from 'react-bootstrap';
import { BsFillPersonFill } from "react-icons/bs";
import { Link, withRouter } from 'react-router-dom';
import Panel from './Panel';
import UserProfile from '../components/UserProfile';

const Header = props => {
    const toProfile = () => {
        Panel.handleShow({
            props: {
                user: props.user
            },
            component: UserProfile,
            callback: data => {
                if (data === 'logout') {
                    props.history.go(0)
                }
            }
        })
    }
    return (
        <Navbar bg="dark" variant="dark">
            <Navbar.Brand className="ml-4" >Nike</Navbar.Brand>
            <Nav className="mr-auto">
                <Nav.Link as={Link} to="/home" >首頁</Nav.Link>
                <Nav.Link as={Link} to="/products" >產品</Nav.Link>
            </Nav>
            {
                props.user.nickname ? (
                    <Nav className="ml-auto">
                        <BsFillPersonFill style={{ height: '32px', width: '32px', marginTop: '5px' }} />
                        <Button onClick={toProfile} className="mr-4" variant="dark">{props.user.nickname}
                        </Button>
                    </Nav>) :
                    (
                        <Nav className="ml-auto">
                            <Button as={Link} to="/register" className="mr-4" variant="dark">註冊</Button>
                            <Button as={Link} to="/login" className="mr-4" variant="dark">登入</Button>
                        </Nav>)
            }
        </Navbar>
    );
}

export default withRouter(Header);

