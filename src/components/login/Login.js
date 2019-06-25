import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { Card, Button } from 'react-bootstrap';
import { Redirect } from 'react-router-dom';
import { setAuthedUser } from '../../actions/authedUser';
import SweetAlert from 'react-bootstrap-sweetalert';
import Select from '../select/Select';
import './Login.css';

class Login extends Component {

    constructor(props) {
        super(props);

        this.state = {
            redirect: false,
            alert: false,
            authedUser: null
        }
    }

    singIn = () => {
        const { authedUser } = this.state;
        
        if (authedUser !== null) {
            this.props.dispatch(setAuthedUser(authedUser));
            this.setState({ redirect: true });
        }
        else {
            this.setState({ alert: true });
        }
    }

    hideAlert = () => {
        this.setState({ alert: false });
    }

    handleChangeUser = (authedUser) => {
        this.setState({ authedUser });
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
                <Card className="login-card">
                    <Card.Header className="card-header">
                        <Card.Title className="card-title">Welcome to the Would You Rather App!</Card.Title>
                        <Card.Subtitle className="card-subtitle">Please sign in to continue</Card.Subtitle>
                    </Card.Header>
                    <Card.Body>
                        <Select users={users} onChange={this.handleChangeUser} />
                        <Button className="login-button" size="md" block onClick={this.singIn}>Sign in</Button>
                    </Card.Body>
                </Card>
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