import React, { Component } from 'react';

import StartScreen from './StartScreen'
import GameBoard from './GameBoard'
import Result from './Result'
import TimeScore from './TimerScore'
import './Game.css';


const initialState = {
    score: 0,
    time: 10,
    isTimeUp: false,
    isStarting: false,
    prepTime: 3,
    start: false,
    pause: false,
};

class Game extends Component {

    state = initialState;

    handleScore = (hasScored) => {
        const { score } = this.state;
        this.setState({score: hasScored ? score + 1 : score - 1})
    }

    handleStart = () => {
        this.setState({
            isStarting: true
        }, () => {
            this.handlePrepTime()
        })
    }

    handlePause = () => {
        this.setState({
            pause: true
        })
    }

    handleRestart = () => {
        this.setState({
            ...initialState
        }, () => {
            this.handleStart()
        })
    }

    handleTimer = () => {
        this.setState({
            isTimeUp: true
        })
    }

    timer = () => {
        const timer = setInterval(() => {
            if (!this.state.isTimeUp) {
                this.setState({
                    time: this.state.time - 1
                }, () => {
                    if (this.state.time === 0) {
                        clearInterval(timer);
                        this.setState({
                            isTimeUp: true
                        });
                    }
                })
            } else {
                clearInterval(timer);
            }
        }, 1000);
    }

    handlePrepTime = () => {
        const timer = setInterval(() => {
            this.setState({
                prepTime: this.state.prepTime - 1
            }, () => {
                if (this.state.prepTime === 0) {
                    clearInterval(timer);
                    this.setState({
                        start: true
                    }, () => {
                        this.timer()
                    });
                }
            })
        }, 1000);
    }

    render() {
        const { isStarting, start, time, score, prepTime, pause, isTimeUp } = this.state;
        return (
            <div className="container">
                {isStarting ? ( 
                    <div className="game">
                        <TimeScore time={time} score={score} />
                        <div className="game-board" ref="gameBoard">
                            <GameBoard 
                                score={this.handleScore} 
                                timer={this.handleTimer} 
                                start={start} 
                                pause={this.handlePause} 
                                isTimeUp={isTimeUp}
                            />
                            {prepTime !== 0 && (
                                <div className="counting-down">
                                    <h2 data-testid="prepTime">{prepTime}</h2>
                                </div>
                            )}
                            {pause && (
                                <Result score={score} pause={pause} handleRestart={this.handleRestart} />
                            )}
                        </div>
                    </div> 
                ) : ( 
                    <StartScreen handleStart={this.handleStart}/> 
                )}
            </div>
        );
    }
}

export default Game;