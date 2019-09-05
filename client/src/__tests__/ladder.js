import '@testing-library/react/cleanup-after-each'

import React from 'react'
import {render, waitForElement} from '@testing-library/react'

import Ladder from '../components/Ladder'
import { getLadder } from '../components/api/fetch'

jest.mock("../components/api/fetch");

const mockedData = [
    {id: 1, name: 'test1', score: 100}, 
    {id: 2, name: 'test2', score: 99}, 
    {id: 3, name: 'test3', score: 88}, 
    {id: 4, name: 'test4', score: 77}, 
    {id: 5, name: 'test5', score: 66}, 
    {id: 6, name: 'test6', score: 55}, 
    {id: 7, name: 'test7', score: 44}, 
    {id: 8, name: 'test8', score: 33}, 
    {id: 9, name: 'test9', score: 22}, 
    {id: 10, name: 'test10', score: 11}, 
    {id: 11, name: 'test11', score: 9}, 
    {id: 12, name: 'test12', score: 8}, 
    {id: 13, name: 'test13', score: 7}, 
    {id: 14, name: 'test14', score: 6}, 
    {id: 15, name: 'test15', score: 5}
]

describe('<Ladder />', () => {
    test('it fetching data on component render', async () => {
        const scores = mockedData;

        getLadder.mockResolvedValueOnce(scores);
        
        const defaultProps = { playerId: 1}

        const { getByText } = render(<Ladder {...defaultProps} />);
        
        expect(getByText('Loading...')).toBeDefined()
 
        expect(getLadder).toHaveBeenCalledTimes(1)

        await waitForElement(() => getByText("test5"));
    })

    test('it should display 10 scores', async () => {
        const scores = mockedData;

        getLadder.mockResolvedValueOnce(scores);
        
        const defaultProps = { playerId: 1}

        const { getByText } = render(<Ladder {...defaultProps} />);

        await waitForElement(() => getByText('1'));

        expect(getByText('1').parentNode.parentNode.childElementCount).toEqual(10)
    })

    test('it displaying player score with custom styles ', async () => {
        const tdStyle = {
            fontSize: "18px",
            color: "#557a95",
            fontWeight: "bold"
        }

        const scores = mockedData;

        getLadder.mockResolvedValueOnce(scores);
        
        const defaultProps = { playerId: 5}

        const { getByText } = render(<Ladder {...defaultProps} />);

        await waitForElement(() => getByText('5'));

        expect(getByText('5').style.fontWeight).toEqual(tdStyle.fontWeight)
        expect(getByText('5').style.fontSize).toEqual(tdStyle.fontSize)
    })

    test('it displaying user score even if he didnt make it to the top 10', async () => {
        const tdStyle = {
            fontSize: "18px",
            color: "#557a95",
            fontWeight: "bold"
        }

        const scores = mockedData;

        getLadder.mockResolvedValueOnce(scores);
        
        const defaultProps = { playerId: 14}

        const { getByText } = render(<Ladder {...defaultProps} />);

        await waitForElement(() => getByText('14'));

        expect(getByText('...').parentElement).toBeDefined()

        expect(getByText('14').style.fontWeight).toEqual(tdStyle.fontWeight)
        expect(getByText('14').style.fontSize).toEqual(tdStyle.fontSize)
        expect(getByText('14').parentNode.parentNode.childElementCount).toEqual(12)
    })
})


