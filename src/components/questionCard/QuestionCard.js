import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Card } from 'react-bootstrap';

import './QuestionCard.css';

class QuestionCard extends Component {

    render() {
        const {questions} = this.props;
        
        const questionsArray = Object.values(questions);
        console.log('questions', questionsArray[0])

        return (
            <Card>
                <Card.Header></Card.Header>
                <Card.Body>
                    <Card.Title>Special title treatment</Card.Title>
                    <Card.Text>
                        With supporting text below as a natural lead-in to additional content.
                    </Card.Text>
                </Card.Body>
            </Card>
        )
    }
}

function mapStateToProps(state) {
    return {
        questions: state.questions
    }
}

export default connect(mapStateToProps)(QuestionCard)