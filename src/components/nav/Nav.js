import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { Nav, Navbar } from 'react-bootstrap';
import Logout from '../logout/Logout';
import { Redirect } from 'react-router-dom';
import './Nav.css';

export const ROUTES = {
    HOME: 'HOME',
    NEW: 'NEW',
    BOARD: 'BOARD'
}

class Navigation extends Component {

    constructor(props) {
        super(props);

        this.state = {
            route: null
        }
    }

    handleSelectRoute = (route) => {
        this.setState({ route });
    }

    renderLoggedNav = () => {
        return (
            <Navbar className="main-navbar">
                <Nav variant="tabs" defaultActiveKey={ROUTES.HOME} className="logged-nav-bar" onSelect={this.handleSelectRoute}>
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
    }

    renderUnloggedNav = () => {
        return (
            <Navbar expand="lg" className="navbar">
                <Navbar.Brand href="#">
                    <span className="brand">Login</span>
                </Navbar.Brand>
            </Navbar>
        )
    }

    renderBody = () => {
        const { route } = this.state;

        switch (route) {
            case ROUTES.NEW:
                return <Redirect to="/add" />
            case ROUTES.BOARD:
                return <Redirect to="/leaderboard" />
            case ROUTES.HOME:
                return <Redirect to="/home" />
            default:
                return null
        }
    }

    render() {
        return (
            <Fragment>
                {!this.props.login ? this.renderLoggedNav() : this.renderUnloggedNav()}
                {this.renderBody()}
            </Fragment>
        )
    }
}

export default connect()(Navigation)