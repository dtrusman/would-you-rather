import React, { Component } from 'react';
import { connect } from 'react-redux';
import { NewQuestion, Board, QuestionCard } from '../';
import { ROUTES } from '../nav/Nav';
import { Tabs, Tab } from 'react-bootstrap';

import './Home.css';

export const TAB_KEY = {
    UNANSWERED: 'UNANSWERED',
    ANSWERED: 'ANSWERED'
}

class Home extends Component {

    constructor(props) {
        super(props);

        this.state = {
            key: TAB_KEY.UNANSWERED
        }
    }

    handleSelect = (selected) => {
        this.setState({ key: selected });
    }

    renderHome = () => {
        return (
            <div>
                <Tabs fill activeKey={this.state.key} onSelect={this.handleSelect} className="tab-list">
                    <Tab eventKey={TAB_KEY.UNANSWERED} title="Unanswered Questions" className="tab-item">
                        <QuestionCard currentTab={this.state.key} />
                    </Tab>
                    <Tab eventKey={TAB_KEY.ANSWERED} title="Answered Questions" className="tab-item">
                        <QuestionCard currentTab={this.state.key} />
                    </Tab>
                </Tabs>
            </div>
        )
    }

    render() {
        const { tab } = this.props;

        switch (tab) {
            case ROUTES.NEW:
                return <NewQuestion />;
            case ROUTES.BOARD:
                return <Board />;
            default:
                return this.renderHome();
        }
    }
}

function mapStateToProps(state) {
    return {
        tab: state.selectedTab
    }
}

export default connect(mapStateToProps)(Home)