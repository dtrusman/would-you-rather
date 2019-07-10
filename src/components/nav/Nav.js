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
            route: null,
            pathname: this.props.pathname
        }
    }

    static getDerivedStateFromProps(nextProps, prevState) {
        if (nextProps.pathname !== prevState.pathname) {
            return { pathname: nextProps.pathname };
        }
        else return null;
    }

    componentDidUpdate(props, state) {
        console.log('pppppppp', props, state)
        if (props.pathname !== state.pathname) {
            this.setState({
                pathname: state.pathname
            })
        }
    }

    handleSelectRoute = (route) => {
        let pathname;

        switch (route) {
            case ROUTES.HOME:
                pathname = '/home'
                break
            case ROUTES.NEW:
                pathname = '/add'
                break
            case ROUTES.BOARD:
                pathname = '/leaderboard'
                break
        }

        this.setState({ route, pathname });
    }

    renderLoggedNav = () => {
        const { pathname } = this.state;

        return (
            <Navbar className="main-navbar">
                <Nav variant="tabs" defaultActiveKey={ROUTES.HOME} className="logged-nav-bar" onSelect={this.handleSelectRoute}>
                    <Nav.Item>
                        <Nav.Link active={pathname === '/home'} eventKey={ROUTES.HOME}>Home</Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                        <Nav.Link active={pathname === '/add'} eventKey={ROUTES.NEW}>New Question</Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                        <Nav.Link active={pathname === '/leaderboard'} eventKey={ROUTES.BOARD}>Leader Board</Nav.Link>
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

function mapStateToProps(state) {
    console.log('state', state)
    return {
        pathname: state.route
    }
}

export default connect(mapStateToProps)(Navigation)