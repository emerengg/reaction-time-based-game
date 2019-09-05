import '@testing-library/react/cleanup-after-each'

import React from 'react'
import {render, fireEvent} from '@testing-library/react'

import Tile from '../components/Tile'

describe('<Tile />', () => {
    test('it render the component', () => {
        const tileMockfn = jest.fn()
        const { container } = render(<Tile 
            handleTileClick={tileMockfn} 
            tile={{id: 1, status: false}}
        />);

        expect(container.firstElementChild).toBeDefined();
        expect(container.firstElementChild.className).toMatch('tile');
    })

    test('it should fire handleTileClick', () => {
        const tileMockfn = jest.fn()
        const { container } = render(<Tile 
            handleTileClick={tileMockfn} 
            tile={{id: 1, status: false}}
        />);

        fireEvent.mouseDown(container.firstChild)
        expect(tileMockfn).toBeCalledTimes(1);
    })

    test('it should display white background of a tile after passing to tile.status false value', () => {
        const tileMockfn = jest.fn()
        const { container } = render(<Tile 
            handleTileClick={tileMockfn} 
            tile={{id: 1, status: false}}
        />);

        expect(container.firstChild.style.backgroundColor).toMatch('white');
    })

    test('it should display blue(#557a95) background of a tile after passing to tile.status true value', () => {
        const tileMockfn = jest.fn()
        const { container } = render(<Tile 
            handleTileClick={tileMockfn} 
            tile={{id: 1, status: true}}
        />);
            
        expect(container.firstChild.style.backgroundColor).toMatch('rgb(85, 122, 149)');
    })
})