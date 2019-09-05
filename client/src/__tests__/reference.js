import '@testing-library/react/cleanup-after-each'

import React from 'react'
import { render } from '@testing-library/react'

import Reference from '../components/Reference'


describe('<Reference />', () => {
    test('it render the component', () => {
        const defaultProps = {
            score: 0,
            pause: false,
            handleRestart: jest.fn()
        }
        const { getByTestId } = render(<Reference {...defaultProps} />);

        expect(getByTestId('references')).toBeDefined()
    })

    test('it has 3 childs', () => {
        const defaultProps = {
            score: 0,
            pause: false,
            handleRestart: jest.fn()
        }
        const { container } = render(<Reference {...defaultProps} />);

        expect(container.firstChild.childElementCount).toEqual(3)
    })
})
