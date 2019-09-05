import '@testing-library/react/cleanup-after-each'

import React from 'react'
import {render, fireEvent} from '@testing-library/react'

import StartScreen from '../components/StartScreen'


describe('<StartScreen />', () => {
    test('it render the component', () => {
        const startMockfn = jest.fn()
        const { container } = render(<StartScreen handleStart={startMockfn} />);

        expect(container.firstChild.className).toMatch('start-screen');
    })

    test('it should call start one time', () => {
        const startMockfn = jest.fn();
        const { getByTestId } = render(<StartScreen handleStart={startMockfn} />);

        const startBtn = getByTestId('btn-start');

        fireEvent.click(startBtn);

        expect(startMockfn).toBeCalledTimes(1)
    })
})