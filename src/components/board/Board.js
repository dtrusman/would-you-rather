import React, { Component } from 'react';
import { connect } from 'react-redux';

class Board extends Component {
    render() {
        return (
            <div>Board</div>
        )
    }
}

export default connect()(Board)