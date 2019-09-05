import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Ladder from './Ladder'
import ScoreBoard from './ScoreBoard'
import Reference from './Reference'

class Result extends Component {
    constructor(props){
        super(props);
        const { score } = this.props
        this.state = {
            player: {id: null, name: null, score: score},
            showResult: false
        }
    }

    static propTypes = {
        score: PropTypes.number.isRequired,
        pause: PropTypes.bool.isRequired,
        handleRestart: PropTypes.func.isRequired
    }

    componentDidMount(){
        const resultBoard = this.refs.resultBoard
        resultBoard.classList.add("pause");
        setTimeout(() => {
            resultBoard.classList.remove("pause");
        }, 750);
    }

    componentDidUpdate(prevProps, prevState) {
        if (this.props.start !== prevProps.start) {
            this.initTiles();
        }else if(this.props.timeIsUp !== prevProps.timeIsUp){
            this.props.timer()
            this.props.pause()
        }
    }

    handleSaveScore = ({id, name, score}) => {
        this.setState({
            player: {id, name, score},
        }, () => {
            // after saving data 
            this.handleLadderClick()
        })
    }

    handleLadderClick = () => {
        this.setState({
            showResult: true
        })
    }

    handleRestartClick = () => {
        this.props.handleRestart()
    }

    render(){
        const { showResult, player } = this.state;
        return (
            <div className="result-wrapper">
                <div className="result-board" ref="resultBoard">
                    {showResult ?
                        <Ladder playerId={player.id} />
                    :
                        <ScoreBoard handleSaveScore={this.handleSaveScore} player={player} />
                    }
                    <div className="scoreboard-restart">
                        {!showResult && <button type="button" className="btn-scoreboard" onClick={this.handleLadderClick}><i className="fas fa-list" data-testid="scoreboard"></i></button>}
                        <button type="button" className="btn-restart" onClick={this.handleRestartClick}  data-testid="restart"><i className="fas fa-undo"></i></button>
                    </div>
                    {!showResult && <Reference />}
                </div>
            </div> 
        )
    }
}

export default Result;