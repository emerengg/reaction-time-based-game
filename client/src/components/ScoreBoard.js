import React, { Component } from 'react';

import { postScore } from './api/fetch'

class ScoreBoard extends Component {
    constructor(props){
        super(props);
        const {id, name, score} = this.props;
        this.state = {
            id,
            name,
            score,
            isLoading: false
        }
    }

    handleNameChange = (event) => {
        const name = event.target.value;
        this.setState({
            name
        });
    }

    handleInputSelect = () => {
        const { input } = this.refs;
        input.classList.remove("error");
        input.placeholder = "";
    }

    handleInputBlur = () => {
        const { input } = this.refs;
        input.placeholder = "Enter your name";
    }

    saveScore = (event) => {
        event.preventDefault();
        const { name } = this.state;
        const { input, validationError } = this.refs;

        validationError.innerHTML = "";
        input.classList.remove("error");

        if(name && name.length > 0){
            if(name.length <= 10){
                this.setState({
                    isLoading: true
                }, () => {
                    this.post()
                })
            }else if(name.length >= 10){
                validationError.innerHTML = "Name can't be longer than 9 characters!";
                input.className = "error";
            }
        }else {
            validationError.innerHTML = "Name field can't be empty!";
            input.className = "error";
        }
    }

    // fetching scores
    post = async () => {
        const { name, score } = this.state;
        await postScore(name, score)
            .then(res => {
                const { id, name, score } = res;
                this.setState({
                    id,
                    name,
                    score
                }, () => {
                    this.props.handleSaveScore(this.state)
                });
            })
            .catch(err => {
                this.setState({
                    isLoading: false
                }, () => {
                    const { input, validationError } = this.refs
                    validationError.innerHTML = "Couldn't save the score!";
                    input.className = "error";
                });
            });
    }

    render() {
        const { name, score, isLoading } = this.state
        return (
            <div className="scoreboard">
                <h1>Time's up!</h1>
                <h2>Your score: {score}</h2>
                {isLoading ? (
                    <div className="loading">
                        <div className="loader"></div>
                    </div>
                ) : (
                    <form className="save-form">
                        <input 
                            type="text" 
                            ref="input" 
                            value={name ? name : ""} 
                            onChange={this.handleNameChange} 
                            onSelect={this.handleInputSelect} 
                            onBlur={this.handleInputBlur} 
                            autoComplete="off" 
                            spellCheck="false" 
                            placeholder="Enter your name"
                        />
                        <div className="valdiation-error" style={{color: 'red', fontSize: '1em'}} ref="validationError" ><p></p></div>
                        <button type="submit" className="btn-save-score" onClick={this.saveScore}>Save score</button>
                    </form>
                )}
            </div>

        );
    }
}

export default ScoreBoard;
