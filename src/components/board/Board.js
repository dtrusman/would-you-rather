import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Card } from 'react-bootstrap';

import './Board.css';

class Board extends Component {

    renderItem = (user) => {

        const answeredQty = Object.keys(user.answers).length;
        const createdQty = Object.keys(user.questions).length;
        const score = answeredQty + createdQty;

        return (
            <Card key={user.id} className="board-card">
                <Card.Body className="board-body">
                    <div className="board-image">
                        <img src={require(`../../resources/icons/${user.avatarURL}`)} alt="Avatar" className="question-avatar" />
                    </div>
                    <div className="board-content">
                        <div>
                            <div className="board-name">{user.name}</div>
                            <div className="questions-result-container">
                                <div className="questions-result">
                                    <div className="question-result-text"><span> Answered questions</span></div>
                                    <div><span> {answeredQty}</span></div>
                                </div>
                            </div>
                            <div className="questions-result-container">
                                <div className="questions-result">
                                    <div className="question-result-text"><span> Created questions</span></div>
                                    <div><span> {createdQty}</span></div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="score-content">
                        <Card className="score-container">
                            <Card.Header className="score-text">Score</Card.Header>
                            <Card.Body className="score-body">
                                <div className="score">
                                    <span>{score}</span>
                                </div>
                            </Card.Body>
                        </Card>
                    </div>
                </Card.Body>
            </Card>
        )
    }

    sortUsers = () => {
        const { users } = this.props;

        return Object.values(users).sort((a, b) => {
            const resA = Object.keys(a.answers).length + a.questions.length;
            const resB = Object.keys(b.answers).length + b.questions.length;

            if (resA > resB) {
                return -1;
            }

            if (resA < resB) {
                return 1
            }

            return 0
        });
    }

    render() {

        const leaders = this.sortUsers();

        return (
            <div className="board-container">
                {leaders.map(this.renderItem)}
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        users: state.users
    }
}

export default connect(mapStateToProps)(Board)