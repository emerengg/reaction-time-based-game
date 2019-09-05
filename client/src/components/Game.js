import React, { Component } from 'react';

import StartScreen from './StartScreen'
import GameBoard from './GameBoard'
import Result from './Result'
import TimeScore from './TimerScore'

import './Game.css';


class Game extends Component {

    state = {
        score: 0,
        time: 30,
        timeIsUp: false,
        prestart: false,
        prepTime: 3,
        start: false,
        pause: false,
        test: false
    }

    handleScore = (score) => {
        if(score){
            this.setState({score: this.state.score + 1})
        }else{
            this.setState({score: this.state.score - 1})
        }
    }

    handleStart = () => {
        this.setState({
            prestart: true
        }, () => {
            this.handlePrepTime()
        })
    }

    handleRestart = () => {
        this.setState({
            score: 0,
            time: 30,
            timeIsUp: false,
            prestart: false,
            prepTime: 3,
            start: false,
            pause: false,
            test: false
        }, () => {
            this.handleStart()
        })
    }

    handleTimer = () => {
        this.setState({
            timeIsUp: true
        })
    }

    timer = () => {
        const timer = setInterval(() => {
            if(!this.state.timeIsUp){
                this.setState({
                    time: this.state.time - 1
                }, () => {
                    if(this.state.time === 0){
                        clearInterval(timer);
                        this.setState({
                            timeIsUp: true
                        })
                    }
                })
            }else{
                clearInterval(timer);
            }
        }, 1000);
    }

    handlePrepTime = () => {
        const timer = setInterval(() => {
            this.setState({
                prepTime: this.state.prepTime - 1
            }, () => {
                if(this.state.prepTime === 0){
                    clearInterval(timer);
                    this.setState({
                        start: true,
                        test: true
                    }, () => {
                        this.timer()
                    })
                }
            })
        }, 1000);
    }

    handlePause = () => {
        this.setState({
            pause: true
        })
    }

    render() {
        const { prestart, start, time, score, test, prepTime, pause, timeIsUp } = this.state;
        return (
            <div className="container">
                {prestart ? 
                    <div className="game">
                        <TimeScore time={time} score={score} />
                        <div className="game-board" ref="gameBoard">
                            <GameBoard 
                                test={test && test} 
                                score={this.handleScore} 
                                timer={this.handleTimer} 
                                start={start} 
                                pause={this.handlePause} 
                                timeIsUp={timeIsUp}
                            />
                            {prepTime !== 0 && <div className="counting-down"><h2 data-testid="prepTime">{prepTime}</h2></div>}
                            {pause && <Result score={score} pause handleRestart={this.handleRestart} />}
                        </div>
                    </div>
                :
                    <StartScreen handleStart={this.handleStart}/>
                }
            </div>
        );
    }
}

export default Game;