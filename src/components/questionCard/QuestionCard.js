import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Card, Button } from 'react-bootstrap';

import './QuestionCard.css';
import { TAB_KEY } from '../home/Home';
import NotFound from '../404/NotFound';

class QuestionCard extends Component {

    _isMounted = false;

    constructor(props) {
        super(props);

        this.state = {
            currentTab: TAB_KEY.UNANSWERED,
            questionsUnanswered: null,
            questionsAnswered: null,
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

        if (this.props.questions !== prevProps.questions) {
            const [questionsUnanswered, questionsAnswered] = await this.filterQuestions();
            this.setState({
                questionsUnanswered,
                questionsAnswered
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

    detailQuestion = (question) => {
        this.props.detail(question);
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
                        <Button variant="outline-light" className="question-button" onClick={() => this.detailQuestion(question)}>View Poll</Button>
                    </div>
                </Card.Body>
            </Card>
        )
    }

    sortQuestions = (questions) => {
        if (questions) {
            return questions.sort((a, b) => {
            
                if (a.timestamp > b.timestamp) {
                    return -1;
                }

                if (a.timestamp < b.timestamp) {
                    return 1
                }

                return 0
            });
        }
    }

    render() {
        const { questionsUnanswered, questionsAnswered, currentTab } = this.state;

        const questions = currentTab === TAB_KEY.UNANSWERED ? this.sortQuestions(questionsUnanswered) : this.sortQuestions(questionsAnswered);

        if (questions) {
            return questions.map(question => {
                return this.renderItem(question);
            });
        }
        else {
            return <NotFound />
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