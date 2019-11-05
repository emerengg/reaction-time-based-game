import React, { Component} from 'react';
import PropTypes from 'prop-types';


class TimeScore extends Component{

    static propTypes = {
        time: PropTypes.number.isRequired,
        score: PropTypes.number.isRequired
    }

    componentDidUpdate(prevProps) {
        const { score } = this.props
        if (score > prevProps.score) {
            this.scoreAnimation("rgba(104, 151, 117, 1)");
        } else if (score < prevProps.score) {
            this.scoreAnimation("rgba(254, 69, 44, 1)");
        }
    }

    scoreAnimation = (color) => {
        const { points } = this.refs;
        points.style.color = color;
        points.style.transition = "0.100s";;
        setTimeout(() => {
            points.style.color = "rgba(255, 255, 255)";
        }, 200);
    }

    render(){
        const { time, score } = this.props;
        return (
            <div className="info">
                <div className="title">
                    <h1>REACTION TIME BASED GAME</h1>
                </div>
                <div className="stats">
                    <div>Timer <span className="timer">{time}</span></div>
                    <div>Score <span className="points" ref="points">{score}</span></div>
                </div>
            </div>
        )
    }
}

export default TimeScore;