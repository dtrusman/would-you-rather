import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Nav, Navbar } from 'react-bootstrap';
import { setAuthedUser } from '../../actions/authedUser';
import './Nav.css';

function Navigation({ login = true, dispatch, users, authedUser }) {

    const user = users[authedUser];

    function handleLogout() {
        dispatch(setAuthedUser(null));
    }

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
                    <div className="nav-logout">
                        <div className="user-name">
                            <span className="authed-user">Hello, {user.name} </span>
                        </div>
                        <img src={require(`../../resources/icons/${user.avatarURL}`)} alt="Avatar" className="avatar" />
                        <div className="text-logout">
                            <Link to="/" onClick={handleLogout}>Logout</Link>
                        </div>
                    </div>
                </Nav>
            </Navbar>
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

function mapStateToProps(state) {
    return {
        users: state.users,
        authedUser: state.authedUser
    }
}

export default connect(mapStateToProps)(Navigation)