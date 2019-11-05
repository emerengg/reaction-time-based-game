import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';

import { getLadder } from './api/fetch'


class Ladder extends Component {
    state = {
        ladder: null,
        error: false
    }

    static propTypes = {
        playerId: PropTypes.number
    }

    componentDidMount = () => {
        this.fetchData();
    }

    // fetching scores
    fetchData = async () => {
        await getLadder()
            .then(data => {
                this.setState({
                    ladder: data
                });
            })
            .catch(err => {
                this.setState({
                    error: !this.state.error
                });
            })
    }
    
    render() {
        const { playerId } = this.props;
        const { ladder, error } = this.state;

        const tdStyle = {
            fontSize: "18px",
            color: "#557a95",
            fontWeight: "bold"
        };

        return (
            <div className="ladder">
                <h1>Top 10 scores</h1>
                {ladder ? (                    
                    <table>
                        <thead>
                            <tr>
                                <th></th>
                                <th>Name</th>
                                <th>Score</th>
                            </tr>
                        </thead>
                        <tbody>
                            {ladder.map((user, index) => {
                                // dsiplay player using styles otherwise 
                                if (index < 10) {
                                    if (user.id === playerId) {
                                        return (
                                            <tr key={index}>
                                                <td style={tdStyle}>{index + 1}</td>
                                                <td style={tdStyle}>{user.name}</td>
                                                <td style={tdStyle}>{user.score}</td>
                                            </tr>
                                        );
                                    }
                                    return (
                                        <tr key={index}>
                                            <td>{index + 1}</td>
                                            <td>{user.name}</td>
                                            <td>{user.score}</td>
                                        </tr>
                                    );
                                } else if (user.id === playerId) {
                                    return (
                                        <Fragment key={index}>
                                            <tr>
                                                <td>...</td>
                                                <td></td>
                                                <td></td>
                                            </tr>
                                            <tr key={index}>
                                                <td style={tdStyle}>{index + 1}</td>
                                                <td style={tdStyle}>{user.name}</td>
                                                <td style={tdStyle}>{user.score}</td>
                                            </tr>
                                        </Fragment>
                                    );
                                }
                                return null;
                            })}
                        </tbody>
                    </table> 
                ) : (
                    <Fragment>
                        {error ? <div className="error">Couldn't load the ladder!</div> : <div ref="loading">Loading...</div>}
                    </Fragment>
                )}
            </div>
        );
    }
}

export default Ladder;
