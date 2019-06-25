import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { Navbar, Card, Button } from 'react-bootstrap';
import { Redirect } from 'react-router-dom';
import SweetAlert from 'react-bootstrap-sweetalert';
import Select from '../select/Select';
import './Login.css';

class Login extends Component {

    constructor(props) {
        super(props);

        this.state = {
            redirect: false,
            alert: false
        }
    }

    singIn = () => {
        const { authedUser } = this.props;

        if (authedUser !== null) {
            this.setState({ redirect: true });
        }
        else {
            this.setState({ alert: true });
        }
    }

    hideAlert = () => {
        this.setState({ alert: false });
    }

    render() {
        const { users } = this.props;
        const { redirect, alert } = this.state;

        if (alert) {
            return (
                <SweetAlert danger title="Sing in" onConfirm={this.hideAlert}>
                    You must choose an user to sign in
                </SweetAlert>
            )
        }

        if (redirect) {
            return <Redirect to="/home" />
        }

        return (
            <Fragment>
                <Navbar expand="lg" className="navbar">
                    <Navbar.Brand href="#">
                        <span className="brand">Login</span>
                    </Navbar.Brand>
                </Navbar>

                <div className="App">
                    <Card className="login-card">
                        <Card.Header className="card-header">
                            <Card.Title className="card-title">Welcome to the Would You Rather App!</Card.Title>
                            <Card.Subtitle className="card-subtitle">Please sign in to continue</Card.Subtitle>
                        </Card.Header>
                        <Card.Body>
                            <Select users={users} />
                            <Button className="login-button" size="md" block onClick={this.singIn}>Sign in</Button>
                        </Card.Body>
                    </Card>
                </div>
            </Fragment>
        )
    }
}

function mapStateToProps(state) {
    return {
        users: state.users,
        authedUser: state.authedUser,
    }
}

export default connect(mapStateToProps)(Login)