import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { setAuthedUser } from '../../actions/authedUser';

import './Logout.css';

function Logout({dispatch, users, authedUser}) {

    const user = users[authedUser];

    function handleLogout() {
        dispatch(setAuthedUser(null));
    }

    return (
        <div className="nav-logout">
            <div className="user-name">
                <span className="authed-user">Hello, {user.name} </span>
            </div>
            <img src={require(`../../resources/icons/${user.avatarURL}`)} alt="Avatar" className="avatar" />
            <div className="text-logout">
                <Link to="/" onClick={handleLogout}>Logout</Link>
            </div>
        </div>
    )
}

function mapStateToProps(state) {
    return {
        users: state.users,
        authedUser: state.authedUser
    }
}

export default connect(mapStateToProps)(Logout)