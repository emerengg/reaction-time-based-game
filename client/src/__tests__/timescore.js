import '@testing-library/react/cleanup-after-each'

import React from 'react'
import {render} from '@testing-library/react'

import TimeScore from '../components/TimerScore'

describe('<TimeScore />', () => {
    test('it render the title, timer and score', () => {
        const defaultProps = {
            time: 10,
            score: 0
        }
        const { getByText } = render(<TimeScore {...defaultProps} />);

        expect(getByText('REACTION TIME BASED GAME').textContent).toMatch('REACTION TIME BASED GAME')
        expect(getByText('Timer').textContent).toMatch('Timer')
        expect(getByText('Score').textContent).toMatch('Score')
    })

    
    test('it render in the template prop values', () => {
        const defaultProps = {
            time: 10,
            score: 0
        }
        const { getByText, rerender } = render(<TimeScore {...defaultProps} />);
        expect(getByText(`${defaultProps.time}`).textContent).toBe('10')
        expect(getByText(`${defaultProps.score}`).textContent).toBe('0')

        rerender(<TimeScore time={30} score={15}/>)
        expect(getByText(`30`).textContent).toBe('30')
        expect(getByText(`15`).textContent).toBe('15')
    })

})