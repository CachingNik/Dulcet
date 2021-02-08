import React from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';
import '../css/waiting.css';

function Waiting () {
    return (
        <CircularProgress color="secondary" className="wait" />
    );
}

export default Waiting;