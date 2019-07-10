import React, { Component } from 'react';
import { connect } from 'react-redux';
import { QuestionCard, Login } from '../';
import { Tabs, Tab } from 'react-bootstrap';
import { Redirect } from 'react-router-dom';
import './Home.css';

export const TAB_KEY = {
    UNANSWERED: 'UNANSWERED',
    ANSWERED: 'ANSWERED'
}

class Home extends Component {

    constructor(props) {
        super(props);

        this.state = {
            key: TAB_KEY.UNANSWERED,
            question: null,
        }
    }

    handleSelect = (selected) => {
        this.setState({ key: selected });
    }

    handleDetail = (question) => {
        this.setState({ question });
    }

    renderHome = () => {
        return (
            <div>
                <Tabs fill activeKey={this.state.key} onSelect={this.handleSelect} className="tab-list">
                    <Tab eventKey={TAB_KEY.UNANSWERED} title="Unanswered Questions" className="tab-item">
                        <QuestionCard currentTab={this.state.key} detail={this.handleDetail} />
                    </Tab>
                    <Tab eventKey={TAB_KEY.ANSWERED} title="Answered Questions" className="tab-item">
                        <QuestionCard currentTab={this.state.key} detail={this.handleDetail} />
                    </Tab>
                </Tabs>
            </div>
        )
    }

    render() {
        const { question } = this.state;

        if (!this.props.authedUser) {
            return <Login />
        }

        return question === null
            ? this.renderHome()
            : <Redirect to={{
                        pathname: '/question/' + question.id,
                        state: {
                            question,
                            currentTab: this.state.key,
                            redirect: true
                        }
                    }}
              />
    }
}

function mapStateToProps(state) {
    return {
        tab: state.selectedTab,
        authedUser: state.authedUser
    }
}

export default connect(mapStateToProps)(Home)