import React from 'react';
import { Link } from 'react-router-dom';
import './NotFound.css';

export default function NotFound() {
    return (
        <div className="not-found-container">
            <h1><span className="text-ops">Oops!</span></h1>
            <h4><span>404 - Not Found</span></h4>
            <Link to="/">GO TO LOGIN</Link>
        </div>
    )
}