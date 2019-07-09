import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { Card, Form, Button, ProgressBar, Spinner } from 'react-bootstrap';
import { TAB_KEY } from '../home/Home';
import { handleInitialDate } from '../../actions/shared';
import { saveQuestionAnswer, getQuestion } from '../../utils/api';

import './Detail.css';

class Detail extends Component {

    constructor(props) {
        super(props);

        this.state = {
            chosenOption: null,
            loading: false,
            result: false,
            question: this.props.location.state.question
        }
    }

    submitAnswer = async (e) => {
        e.preventDefault();
        this.setState({ loading: true });

        const { chosenOption, question } = this.state;
        const { authedUser } = this.props;

        const id = await saveQuestionAnswer({ authedUser, qid: question.id, answer: chosenOption });

        if (id) {
            this.props.dispatch(handleInitialDate());

            const questions = await getQuestion();
            
            this.setState({ loading: false, result: true, question: questions[question.id] });
        }

    }

    handleOption = (e) => {
        this.setState({ chosenOption: e.target.value });
    }

    disableButton = () => {
        const { chosenOption } = this.state;

        return chosenOption === null ? true : false;
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

    renderQuestionContent = (question) => {
        const { loading } = this.state;

        return (
            <Fragment>
                <div className="title">Would you rather</div>
                <Form onSubmit={this.submitAnswer}>
                    <Form.Check
                        custom
                        type='radio'
                        label={question.optionOne.text}
                        name="questionOptions"
                        id={`${question.id}-one`}
                        value="optionOne"
                        onChange={this.handleOption}
                    />
                    <Form.Check
                        custom
                        type='radio'
                        label={question.optionTwo.text}
                        name="questionOptions"
                        id={`${question.id}-two`}
                        value="optionTwo"
                        onChange={this.handleOption}
                    />
                    <Button variant="outline-light" className="response-button" type="submit" disabled={this.disableButton()}>
                        {loading ? this.renderSpinner() : 'Submit'}
                    </Button>
                    {/* <Button variant="outline-light" className="response-button-cancel" onClick={this.cancelQuestion}>Cancel</Button> */}
                </Form>
            </Fragment>
        )
    }

    renderResult = (question) => {
        const { users, authedUser } = this.props;
        const chosenOption = users[authedUser].answers[question.id];

        const votesOptionOne = question.optionOne.votes.length;
        const votesOptionTwo = question.optionTwo.votes.length;
        const totalVotes = votesOptionOne + votesOptionTwo;
        const percentOne = parseFloat(votesOptionOne / totalVotes * 100).toFixed(1);
        const percentTwo = parseFloat(votesOptionTwo / totalVotes * 100).toFixed(1);

        return (
            <Fragment>
                <div className="title">
                    <span>Results</span>
                </div>
                <div>
                    <div className={`results ${chosenOption === 'optionOne' && 'voted'}`}>
                        <div className="question-text "><span>{`Would you rather ${question.optionOne.text}?`}</span></div>
                        <div className="results-progress"><ProgressBar now={percentOne} label={`${percentOne}%`} /></div>
                        <div className="votes-text"><span>{`${votesOptionOne} out of ${totalVotes} votes`}</span></div>
                    </div>

                    <div className={`results ${chosenOption === 'optionTwo' && 'voted'}`}>
                        <div className="question-text"><span>{`Would you rather ${question.optionTwo.text}?`}</span></div>
                        <div className="results-progress"><ProgressBar now={percentTwo} label={`${percentTwo}%`} /></div>
                        <div className="votes-text"><span>{`${votesOptionTwo} out of ${totalVotes} votes`}</span></div>
                    </div>
                </div>
            </Fragment>
        )
    }

    render() {
        const { currentTab } = this.props.location.state;
        const { users } = this.props;
        const { result, question } = this.state

        return (
            <Card key={question.id} className="question-container-detail">
                <Card.Header>{`${question.author} asks:`}</Card.Header>
                <Card.Body className="question-body">
                    <div className="user-image-results">
                        <img src={require(`../../resources/icons/${users[question.author].avatarURL}`)} alt="Avatar" className="question-avatar-results" />
                    </div>
                    <div className="question-content">
                        {currentTab === TAB_KEY.UNANSWERED && !result ? this.renderQuestionContent(question) : this.renderResult(question)}
                    </div>
                </Card.Body>
            </Card>
        )
    }
}

function mapStateToProps(state) {
    return {
        users: state.users,
        authedUser: state.authedUser,
    }
}

export default connect(mapStateToProps)(Detail);