import React from 'react';
import PropTypes from 'prop-types';

import Reference from './Reference'

function StartScreen(props) {
    return (
        <div className="start-screen">
            <div className="welcome">
                <h1>REACTION TIME BASED GAME</h1>
                <h3>Click on the <span>blue tiles</span> to get points.</h3>
            </div>
            <button type="button" data-testid="btn-start" className="btn-start" onClick={() => props.handleStart()}><i className="fas fa-play"></i></button>
            <Reference />
        </div>
    )
}

StartScreen.propTypes = {
    handleStart: PropTypes.func.isRequired
}
 
export default StartScreen;