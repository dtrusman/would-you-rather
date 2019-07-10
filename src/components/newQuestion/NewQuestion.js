import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { Card, Button, Form, Spinner } from 'react-bootstrap';
import { saveQuestion } from '../../utils/api';
import { handleInitialDate } from '../../actions/shared';
import Login from '../login/Login';

import './NewQuestion.css';

const OPTIONS = {
    ONE: 'ONE',
    TWO: 'TWO',
}

class Question extends Component {

    constructor(props) {
        super(props);

        this.state = {
            optionOne: '',
            optionTwo: '',
            loading: false,
        }
    }

    handleSubmit = async (e) => {
        e.preventDefault();

        this.setState({ loading: true });

        const { authedUser } = this.props;
        const { optionOne, optionTwo } = this.state;

        const question = {
            optionOneText: optionOne,
            optionTwoText: optionTwo,
            author: authedUser
        }

        const saved = await saveQuestion(question);

        if (saved) {
            this.props.dispatch(handleInitialDate());
            this.setState({
                optionOne: '',
                optionTwo: '',
                loading: false
            });
        }

    }

    handleOption = (e) => {
        let options;

        if (e.target.name === OPTIONS.ONE) {
            options = { optionOne: e.target.value };
        } else {
            options = { optionTwo: e.target.value };
        }

        this.setState(options)
    }

    renderSpinner = () => {
        return (
            <Fragment>
                <Spinner
                    as="span"
                    animation="border"
                    size="sm"
                    role="status"
                    aria-hidden="true"
                />
                <span className="sr-only">Loading...</span>
            </Fragment>
        )
    }

    disableButton = () => {
        const { optionOne, optionTwo, loading } = this.state;

        if (loading || optionOne === '' || optionTwo === '') {
            return true;
        }
        else {
            return false;
        }

    }

    render() {
        const { optionOne, optionTwo, loading } = this.state;

        if (!this.props.authedUser) {
            return <Login />
        }

        return (
            <Card className="new-question-container">
                <Card.Header className="new-question-title"><span>Create New Question</span></Card.Header>
                <Card.Body className="question-body">
                    <div className="new-question-content">
                        <span>Complete the question:</span>
                        <div className="new-question-body">
                            <span className="question-title">Would you rather...</span>
                            <div className="form-container">
                                <Form onSubmit={this.handleSubmit}>
                                    <Form.Group controlId="form.ControlInput1">
                                        <Form.Control
                                            type="text"
                                            name={OPTIONS.ONE}
                                            placeholder="Enter Option One Text Here"
                                            className="options-input"
                                            value={optionOne}
                                            onChange={this.handleOption}
                                        />

                                        <div className="fancy"><span>OR</span></div>

                                        <Form.Control
                                            type="text"
                                            name={OPTIONS.TWO}
                                            placeholder="Enter Option Two Text Here"
                                            className="options-input"
                                            value={optionTwo}
                                            onChange={this.handleOption}
                                        />
                                    </Form.Group>

                                    <Button variant="outline-light" className="new-question-button" type="submit" disabled={this.disableButton()}>
                                        {loading ? this.renderSpinner() : 'Submit'}
                                    </Button>
                                </Form>
                            </div>
                        </div>
                    </div>
                </Card.Body>
            </Card>
        )
    }
}

function mapStateToProps(state) {
    return {
        authedUser: state.authedUser
    }
}

export default connect(mapStateToProps)(Question)