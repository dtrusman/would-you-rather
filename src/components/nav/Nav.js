import React from 'react';
import { Nav, Navbar } from 'react-bootstrap';
import './Nav.css';

export default function Navigation({ login = true }) {

    if (!login) {
        return (
            <Nav variant="tabs" defaultActiveKey="home">
                <Nav.Item>
                    <Nav.Link eventKey="home">Home</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                    <Nav.Link eventKey="new-question">New Question</Nav.Link>
                </Nav.Item>
            </Nav>
        )

    }
    else {
        return (
            <Navbar expand="lg" className="navbar">
                <Navbar.Brand href="#">
                    <span className="brand">Login</span>
                </Navbar.Brand>
            </Navbar>
        )
    }

}