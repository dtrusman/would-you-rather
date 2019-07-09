import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import LoadingBar from 'react-redux-loading';
import { Login, Home, NewQuestion, Board, Nav, Detail } from './components';

import { handleInitialDate } from './actions/shared';

import './App.css';

class App extends Component {

    componentDidMount() {
        this.props.initialData();
    }

    render() {
        const { authedUser } = this.props;

        return (
            <Router>
                <LoadingBar style={{ backgroundColor: '#006400', height: '3px', zIndex: 9999 }} />
                <div className="App">
                    <Nav login={authedUser === null} />
                    <div className="app-body">
                        <Route exact path="/" component={Login} />
                        <Route path="/home" component={Home} />
                        <Route path="/add" component={NewQuestion} />
                        <Route path="/leaderboard" component={Board} />
                        <Route path="/question/:question_id" render={props => <Detail {...props} />} />

                        {authedUser === null && <Redirect to="/" />}
                    </div>
                </div>
            </Router>
        )
    }
}

const mapDispatchToProps = dispatch => ({
    initialData: () => dispatch(handleInitialDate())
})

function mapStateToProps(state) {
    return {
        authedUser: state.authedUser
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(App);