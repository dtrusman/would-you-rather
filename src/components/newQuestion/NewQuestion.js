import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Card, Button, Form } from 'react-bootstrap';

import './NewQuestion.css';

class Question extends Component {
    render() {
        return (
            <Card className="new-question-container">
                <Card.Header className="new-question-title"><span>Create New Question</span></Card.Header>
                <Card.Body className="question-body">
                    <div className="new-question-content">
                        <span>Complete the question:</span>
                        <div className="new-question-body">
                            <span className="question-title">Would you rather...</span>
                            <div className="form-container">
                                <Form>
                                    <Form.Group controlId="form.ControlInput1">
                                        <Form.Control type="text" placeholder="Enter Option One Text Here" className="options-input" />
                                        <div className="fancy"><span>OR</span></div>
                                        <Form.Control type="text" placeholder="Enter Option Two Text Here" className="options-input" />
                                    </Form.Group>

                                    <Button variant="outline-light" className="new-question-button">Submit</Button>
                                </Form>
                            </div>
                        </div>
                    </div>
                </Card.Body>
            </Card>
        )
    }
}

export default connect()(Question)