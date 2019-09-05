import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Tile from './Tile'

let tiles = [
    { id: 1, status: false },
    { id: 2, status: false },
    { id: 3, status: false },
    { id: 4, status: false },
    { id: 5, status: false },
    { id: 6, status: false },
    { id: 7, status: false },
    { id: 8, status: false },
    { id: 9, status: false },
    { id: 10, status: false },
    { id: 11, status: false },
    { id: 12, status: false },
    { id: 13, status: false },
    { id: 14, status: false },
    { id: 15, status: false },
    { id: 16, status: false }
]


if(window.innerWidth <= 600){
    tiles = tiles.slice(0, 12);
}


class GameBoard extends Component {
    constructor(props){
        super(props);
        this.state = {
            tiles: tiles,
            activeTiles: tiles,
        }
    }

    static propTypes = {
        start: PropTypes.bool.isRequired,
        timeIsUp: PropTypes.bool.isRequired,
        score: PropTypes.func.isRequired,
        timer: PropTypes.func.isRequired, 
        pause: PropTypes.func.isRequired
    }

    // change amount of tiles depending of the window size
    updateDimensions = () => {
        if(window.innerWidth < 600){
            this.setState({
                tiles: this.state.tiles.filter(tile => tile.id < 13)
            })
        }else if (window.innerWidth > 600){
            this.setState({
                tiles
            })
        }
    }
 
    componentDidMount = () => {
        window.onresize = () => {
            this.updateDimensions();
        }
    }

    componentWillUnmount = () => {
        window.onresize = () => {
            this.updateDimensions();
        }
    }


    componentDidUpdate(prevProps, prevState) {
        if (this.props.start !== prevProps.start) {
            this.initTiles();
        }else if(this.props.timeIsUp !== prevProps.timeIsUp){
            this.props.timer()
            this.props.pause()
        }
    }

    initTiles = () => {
        let { tiles } = this.state;
        let activeTiles = tiles
        
        for(let x = 0; x < 3; x++){
            const randomTile = activeTiles[Math.floor(Math.random() * activeTiles.length)]
            tiles = tiles.map(tile => tile === randomTile ? { id: randomTile.id, status: !randomTile.status } : tile)
            activeTiles = tiles.filter(tile => !tile.status)
        }

        this.setState({
            tiles,
            activeTiles
        })
    }

    handleTileClick = ({id, status}) => {
        let score;
        if(status){
            const { tiles } = this.state;

            const activeTiles = tiles.filter(tile => !tile.status)
            const randomTile = activeTiles[Math.floor(Math.random() * activeTiles.length)]


            const newTiles = tiles.map(tile => {
                if (tile.id === id){
                    return { id, status: !tile.status }
                }else if (tile === randomTile) {
                    return { id: randomTile.id, status: !randomTile.status }
                }
                return tile
            })

            score = true;
            this.setState({
                tiles: newTiles,
            })

        }else {
            score = false
        }
        this.props.score(score)
    }

    render() {
        const { tiles } = this.state
        return (
            <div className="grid" data-testid="grid">
                {tiles.map(tile => <Tile key={tile.id} handleTileClick={this.handleTileClick} tile={tile}/>)}
            </div>
        );
    }
}

export default GameBoard;