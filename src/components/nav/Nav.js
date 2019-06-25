import React from 'react';
import { Nav, Navbar } from 'react-bootstrap';
import Logout from '../logout/Logout';
import './Nav.css';

export default function Navigation({ login = true }) {

    if (!login) {

        return (
            <Navbar className="main-navbar">
                <Nav variant="tabs" defaultActiveKey="home" className="logged-nav-bar">
                    <Nav.Item>
                        <Nav.Link eventKey="home">Home</Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                        <Nav.Link eventKey="new-question">New Question</Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                        <Nav.Link eventKey="leader-board">Leader Board</Nav.Link>
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