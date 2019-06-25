import React from 'react';
import { connect } from 'react-redux';
import { Nav, Navbar } from 'react-bootstrap';
import Logout from '../logout/Logout';
import { setSelectedTab } from '../../actions/selectedTab';
import './Nav.css';

export const ROUTES = {
    HOME: 'HOME',
    NEW: 'NEW',
    BOARD: 'BOARD' 
}

function Navigation({ login = true, dispatch }) {

    function handleSelectTab(selected) {
        dispatch(setSelectedTab(selected));
    }

    if (!login) {

        return (
            <Navbar className="main-navbar">
                <Nav variant="tabs" defaultActiveKey={ROUTES.HOME} className="logged-nav-bar" onSelect={handleSelectTab}>
                    <Nav.Item>
                        <Nav.Link eventKey={ROUTES.HOME}>Home</Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                        <Nav.Link eventKey={ROUTES.NEW}>New Question</Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                        <Nav.Link eventKey={ROUTES.BOARD}>Leader Board</Nav.Link>
                    </Nav.Item>
                    <Logout />
                </Nav>
            </Navbar>
        )

    } else {

        return (
            <Navbar expand="lg" className="navbar">
                <Navbar.Brand href="#">
                    <span className="brand">Login</span>
                </Navbar.Brand>
            </Navbar>
        )
    }

}

export default connect()(Navigation)