import '@testing-library/react/cleanup-after-each'

import React from 'react'
import {render, fireEvent} from '@testing-library/react'

import Result from '../components/Result'


describe('<Result />', () => {
    test('it render the component', () => {
        const defaultProps = {
            score: 0,
            pause: false,
            handleRestart: jest.fn()
        }
        const { container } = render(<Result {...defaultProps} />);
        expect(container.firstElementChild).toBeDefined();
        expect(container.firstElementChild.className).toMatch('result-wrapper');
    })

    test('it displaying <PlayerScoreBoard /> component ', () => {
        const defaultProps = {
            score: 0,
            pause: false,
            handleRestart: jest.fn()
        }
        const { getByText } = render(<Result {...defaultProps} />);
        expect(getByText("Time's up!")).toBeDefined();
    })

    test('it displaying <Reference /> component on render', () => {
        const defaultProps = {
            score: 0,
            pause: false,
            handleRestart: jest.fn()
        }
        const { getByTestId } = render(<Result {...defaultProps} />);

        expect(getByTestId('references')).toBeDefined()
    })

    test('it displaying <Ladder /> component after button click', () => {
        const defaultProps = {
            score: 0,
            pause: false,
            handleRestart: jest.fn()
        }
        const { getByTestId, getByText } = render(<Result {...defaultProps} />);

        fireEvent.click(getByTestId('scoreboard'))
        expect(getByText("Top 10 scores")).toBeDefined();
    })

    test('it should call handleRestart callback prop', () => {
        const defaultProps = {
            score: 0,
            pause: false,
            handleRestart: jest.fn()
        }
        const { getByTestId, debug } = render(<Result {...defaultProps} />);
        expect(getByTestId('restart')).toBeDefined();

        fireEvent.click(getByTestId('restart'))
        
        expect(defaultProps.handleRestart).toBeCalledTimes(1)
    })
})
