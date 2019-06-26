import React, { Component } from 'react';
import { connect } from 'react-redux';

class Board extends Component {
    render() {
        return (
            <div>Boardaaa</div>
        )
    }
}

export default connect()(Board)