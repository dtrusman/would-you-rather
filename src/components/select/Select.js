import React from 'react';

import './Select.css';

export default function Select({ users, onChange }) {

    function handleChange(e) {
        e.preventDefault();

        const authedUser = e.target.value;

        onChange(authedUser);
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