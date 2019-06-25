import React from 'react';
import { connect } from 'react-redux';
import { setAuthedUser } from '../../actions/authedUser';

import './Select.css';

function Select({ users, dispatch }) {

    function handleChange(e) {
        e.preventDefault();
        const authedUser = e.target.value;
        dispatch(setAuthedUser(authedUser));
    }

    return (
        <div>
            <select className="select-container" defaultValue="" required onChange={handleChange}>
                <option value="" disabled> Select user </option>
                {Object.values(users).map(user => (
                    <option key={user.id} value={user.id}>
                        {user.name}
                    </option>
                ))}
            </select>
        </div>
    )
}

export default connect()(Select)