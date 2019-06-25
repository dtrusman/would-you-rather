import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Question, Board, QuestionCard } from '../';
import { ROUTES } from '../nav/Nav';
import { Tabs, Tab } from 'react-bootstrap';

import './Home.css';

class Home extends Component {

    constructor(props) {
        super(props);

        this.state = {
            key: 1
        }
    }

    handleSelect = (selected) => {
        this.setState({ key: selected });
    }

    renderHome = () => {
        return (
            <div>
                <Tabs fill activeKey={this.state.key} onSelect={this.handleSelect} className="tab-list">
                    <Tab eventKey={1} title="Unanswered Questions" className="tab-item">
                        <QuestionCard />
                    </Tab>
                    <Tab eventKey={2} title="Answered Questions" className="tab-item">
                        Answered Questions Cntent
                    </Tab>
                </Tabs>
            </div>
        )
    }

    render() {
        const { tab } = this.props;

        switch (tab) {
            case ROUTES.NEW:
                return <Question />;
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