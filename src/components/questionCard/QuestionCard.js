import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { Card, Button, Form, ProgressBar } from 'react-bootstrap';

import './QuestionCard.css';
import { TAB_KEY } from '../home/Home';

class QuestionCard extends Component {

    _isMounted = false;

    constructor(props) {
        super(props);

        this.state = {
            currentTab: TAB_KEY.UNANSWERED,
            questionsUnanswered: null,
            questionsAnswered: null,
            question: null
        }
    }

    async componentDidMount() {
        this._isMounted = true;

        const [questionsUnanswered, questionsAnswered] = await this.filterQuestions();

        if (this._isMounted) {
            this.setState({
                questionsUnanswered,
                questionsAnswered
            });
        }
    }

    componentWillUnmount() {
        this._isMounted = false;
    }

    static getDerivedStateFromProps(props, state) {
        if (props.currentTab !== state.currentTab) {
            return {
                currentTab: props.currentTab
            }
        }

        return null;
    }

    async componentDidUpdate(prevProps) {
        if (this.props.currentTab !== prevProps.currentTab) {
            this.setState({
                currentTab: this.props.currentTab
            });
        }
    }

    filterQuestions = () => {
        const { users, authedUser, questions } = this.props;

        return new Promise((res, rej) => {
            let qa = [];
            let qu = [];

            /* eslint-disable-next-line */
            Object.values(questions).map(question => {
                const [user] = Object.values(users).filter(u => u.id === authedUser);


                if (user && Object.keys(user.answers).includes(question.id)) {
                    qa.push(question);
                } else if (user && !Object.keys(user.answers).includes(question.id)) {
                    qu.push(question);
                }

            });

            res([qu, qa]);
        })
    }

    reply = (question) => {
        this.setState({ question })
    }

    renderItem = (question) => {
        const { users } = this.props;

        return (
            <Card key={question.id} className="question-container">
                <Card.Header>{`${question.author} asks:`}</Card.Header>
                <Card.Body className="question-body">
                    <div className="user-image">
                        <img src={require(`../../resources/icons/${users[question.author].avatarURL}`)} alt="Avatar" className="question-avatar" />
                    </div>
                    <div className="question-content">
                        <div className="title">Would you rather</div>
                        <div className="question-text">{`...${question.optionOne.text}...`}</div>
                        <Button variant="outline-light" className="question-button" onClick={() => this.reply(question)}>View Poll</Button>
                    </div>
                </Card.Body>
            </Card>
        )
    }

    cancelQuestion = () => {
        this.setState({ question: null })
    }

    renderReply = () => {
        const { users, currentTab } = this.props;
        const { question } = this.state;

        return (
            <Card key={question.id} className="question-container">
                <Card.Header>{`${question.author} asks:`}</Card.Header>
                <Card.Body className="question-body">
                    <div className="user-image-results">
                        <img src={require(`../../resources/icons/${users[question.author].avatarURL}`)} alt="Avatar" className="question-avatar-results" />
                    </div>
                    <div className="question-content">
                        {currentTab === TAB_KEY.UNANSWERED ? this.renderQuestionContent(question) : this.renderResult(question)}
                    </div>
                </Card.Body>
            </Card>
        )
    }

    renderResult = (question) => {
        const { users, authedUser } = this.props;
        const chosenOption = users[authedUser].answers[question.id];
        console.log('chosenOption......', chosenOption);
        const votesOptionOne = question.optionOne.votes.length;
        const votesOptionTwo = question.optionTwo.votes.length;
        const totalVotes = votesOptionOne + votesOptionTwo;
        const percentOne = parseFloat(votesOptionOne / totalVotes * 100).toFixed(1);
        const percentTwo = parseFloat(votesOptionTwo / totalVotes * 100).toFixed(1);

        return (
            <Fragment>
                <div className="title">
                    <span>Results</span>
                    <Button className="cancel-button" onClick={this.cancelQuestion}>X</Button>
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

    renderQuestionContent = (question) => {
        return (
            <Fragment>
                <div className="title">Would you rather</div>
                <Form>
                    <Form.Check
                        custom
                        type='radio'
                        label={question.optionOne.text}
                        name="questionOptions"
                        id={`${question.id}-one`}
                    />
                    <Form.Check
                        custom
                        type='radio'
                        label={question.optionTwo.text}
                        name="questionOptions"
                        id={`${question.id}-two`}
                    />
                    <Button variant="outline-light" className="response-button">Submit</Button>
                    <Button variant="outline-light" className="response-button-cancel" onClick={this.cancelQuestion}>Cancel</Button>
                </Form>
            </Fragment>
        )
    }

    render() {
        const { questionsUnanswered, questionsAnswered, currentTab, question } = this.state;

        const questions = currentTab === TAB_KEY.UNANSWERED ? questionsUnanswered : questionsAnswered;

        if (question !== null) return this.renderReply();

        if (questions) {
            return questions.map(question => {
                return this.renderItem(question);
            });
        }
        else {
            return <div>Loading...</div>
        }
    }
}

function mapStateToProps(state) {
    return {
        questions: state.questions,
        users: state.users,
        authedUser: state.authedUser
    }
}

export default connect(mapStateToProps)(QuestionCard)