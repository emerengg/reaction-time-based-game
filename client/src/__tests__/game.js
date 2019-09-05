import '@testing-library/react/cleanup-after-each'

import React from 'react'
import {render, fireEvent} from '@testing-library/react'

import Game from '../components/Game'


describe('<Game />', () => {
    test('it render the component', () => {
        const { container } = render(<Game />);

        expect(container.firstElementChild).toBeDefined();
        expect(container.firstElementChild.className).toMatch('container');
    })

    test('it render the StartScreen component', () => {
        const { getByText } = render(<Game />);

        expect(getByText('REACTION TIME GAME')).toBeDefined();
    })

    test('it displaying game container (div className="game") after clicking start button', () => {
        const { container, getByTestId } = render(<Game />);

        const startBtn = getByTestId('btn-start');
        expect(startBtn).toBeDefined();

        fireEvent.click(startBtn);

        expect(container.firstChild.childNodes[0].className).toMatch('game');
    })
})