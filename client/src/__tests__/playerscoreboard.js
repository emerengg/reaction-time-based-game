import '@testing-library/react/cleanup-after-each'

import React from 'react'
import {render, fireEvent} from '@testing-library/react'

import ScoreBoard from '../components/ScoreBoard'
import { postScore } from '../components/api/fetch'

jest.mock("../components/api/fetch");

describe('<Ladder />', () => {
    test('it render component', () => {
        const saveScoreMockfn = jest.fn()
        const defaultProps = { 
            player: {id: null, name: null, score: null},
            handleSaveScore: saveScoreMockfn
        }

        const { getByText, getByPlaceholderText } = render(<ScoreBoard {...defaultProps} />);
        
        expect(getByText("Time's up!")).toBeDefined()
        expect(getByText(/Your score/i)).toBeDefined()
        expect(getByPlaceholderText("Enter your name")).toBeDefined()
        expect(getByText("Save score")).toBeDefined()
    })

    test('entering error for empty name', () => {
        const saveScoreMockfn = jest.fn()
        const defaultProps = { 
            player: {id: null, name: null, score: null},
            handleSaveScore: saveScoreMockfn
        }
        const { getByPlaceholderText, getByText } = render(<ScoreBoard {...defaultProps} />);

        const input = getByPlaceholderText('Enter your name')
        fireEvent.change(input, {target: {value: ""}})

        fireEvent.click(getByText('Save score'))
        expect(getByText("Name field can't be empty!")).toBeDefined()
    })

    test('entering error for name bigger than 9 character', () => {
        const saveScoreMockfn = jest.fn()
        const defaultProps = { 
            player: {id: null, name: null, score: null},
            handleSaveScore: saveScoreMockfn
        }
        const { getByPlaceholderText, getByText } = render(<ScoreBoard {...defaultProps} />);

        const input = getByPlaceholderText('Enter your name')
        fireEvent.change(input, {target: {value: "playerName123"}})

        fireEvent.click(getByText('Save score'))
        expect(getByPlaceholderText("Enter your name")).toBeDefined()
        expect(getByText("Name can't be longer than 9 characters!")).toBeDefined()
    })


    test('it should post player score', () => {
        const mockedData = {id: null, name: null, score: null};
        const scores = mockedData;
        postScore.mockResolvedValueOnce(scores);

        const saveScoreMockfn = jest.fn()
        const defaultProps = { 
            player: {id: null, name: null, score: null},
           
        }
        const { getByPlaceholderText, getByText, debug } = render(<ScoreBoard  handleSaveScore={saveScoreMockfn} {...defaultProps} />);

        const input = getByPlaceholderText('Enter your name')
        
        fireEvent.change(input, {target: {value: "pname"}})
        
        fireEvent.click(getByText('Save score'))

        expect(postScore).toHaveBeenCalledTimes(1)
    })
})


