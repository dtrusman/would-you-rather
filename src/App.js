import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import LoadingBar from 'react-redux-loading';
import { Login, Home } from './components';

import { handleInitialDate } from './actions/shared';

import './App.css';

class App extends Component {

    componentDidMount() {
        this.props.dispatch(handleInitialDate());
    }

    render() {
        return (
            <Router>
                <LoadingBar style={{ backgroundColor: '#006400', height: '3px', zIndex: 9999 }} />
                <div className="App">
                    <Route exact path="/" component={Login} />
                    <Route path="/home" component={Home} />
                </div>
            </Router>
        )
    }
}

// const mapDispatchToProps = dispatch => ({
//     initialData: () => dispatch(handleInitialDate())
// })

// function mapStateToProps(state) {
//     return {
//         authedUser: state.authedUser
//     }
// }

export default connect(
    // mapStateToProps,
    // mapDispatchToProps
)(App);