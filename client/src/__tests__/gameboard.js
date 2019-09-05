import '@testing-library/react/cleanup-after-each'

import React from 'react'
import {render, fireEvent} from '@testing-library/react'

import GameBoard from '../components/GameBoard'


describe('<Game />', () => {
    test('it render the component', () => {
        const defaultProps = {
            start: false,
            timeIsUp: false,
            score: jest.fn(),
            timer: jest.fn(), 
            pause: jest.fn()
        }
        const { container } = render(<GameBoard {...defaultProps} />);

        expect(container.firstChild).toBeDefined()
    })

    test('it should call score prop', () => {
        const defaultProps = {
            start: false,
            timeIsUp: false,
            score: jest.fn(),
            timer: jest.fn(), 
            pause: jest.fn()
        }
        const { container } = render(<GameBoard {...defaultProps} />);

        const tile = container.firstChild.childNodes[0];
        fireEvent.mouseDown(tile)

        expect(defaultProps.score).toBeCalledTimes(1)
    })

    
    test('it should render 16 tiles', () => {
        const defaultProps = {
            start: false,
            timeIsUp: false,
            score: jest.fn(),
            timer: jest.fn(), 
            pause: jest.fn()
        }
        const { container, debug } = render(<GameBoard {...defaultProps} />);

        expect(container.firstChild.childNodes.length).toEqual(16)
    })

    
    test('it should start the game after passing true value to start prop, and change color for 3 random tiles', () => {
        const defaultProps = {
            start: false,
            timeIsUp: false,
            score: jest.fn(),
            timer: jest.fn(), 
            pause: jest.fn()
        }
        const { container, debug, rerender } = render(<GameBoard {...defaultProps} />);

        rerender(<GameBoard {...defaultProps} start={true}/>);

        const tiles = container.firstChild.childNodes;
        let styledTiles = [];
        tiles.forEach(tile => tile.style.backgroundColor !== 'white' && styledTiles.push(tile))
        expect(styledTiles.length).toEqual(3)
    })
})