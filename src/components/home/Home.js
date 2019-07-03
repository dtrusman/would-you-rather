import React, { Component } from 'react';
import { connect } from 'react-redux';
import { NewQuestion, Board, QuestionCard, Detail } from '../';
import { ROUTES } from '../nav/Nav';
import { Tabs, Tab } from 'react-bootstrap';
import { handleInitialDate } from '../../actions/shared';

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
            result: false,
        }
    }

    handleSelect = (selected) => {
        this.setState({ key: selected });
    }

    handleDetail = (question) => {
        this.setState({ question });
    }

    resetQuestion = () => {
        this.setState({ question: null, result: false });
    }

    updateData = (question) => {
        this.props.dispatch(handleInitialDate());

        this.setState({ question, result: true });
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
        const { tab } = this.props;
        const { question, result } = this.state;

        switch (tab) {
            case ROUTES.NEW:
                return <NewQuestion />;
            case ROUTES.BOARD:
                return <Board />;
            default:
                return question === null
                    ? this.renderHome()
                    : <Detail
                        question={question}
                        currentTab={this.state.key}
                        clearQuestion={this.resetQuestion}
                        update={this.updateData}
                        result={result}
                    />;
        }
    }
}

function mapStateToProps(state) {
    return {
        tab: state.selectedTab
    }
}

export default connect(mapStateToProps)(Home)