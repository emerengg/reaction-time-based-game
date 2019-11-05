import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Tile extends Component {

    static propTypes = {
        tile: PropTypes.shape({
            id: PropTypes.number.isRequired,
            status: PropTypes.bool.isRequired
        }),
        handleTileClick: PropTypes.func.isRequired
    }

    tileClick = () => {
        const { id, status } = this.props.tile;
        this.props.handleTileClick({id, status});
    }

    render() {
        const { status } = this.props.tile ;
        const tileStyle = { 
            transition: "0.115s",
            backgroundColor: status ? '#557a95' : 'white'
        };
        return (
            <div className="tile" ref="tile" style={tileStyle} onMouseDown={this.tileClick}></div>
        );
    }
}

export default Tile;
