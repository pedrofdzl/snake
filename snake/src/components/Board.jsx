// Styles
import styled from '@emotion/styled'

// Hooks
import { useBoardConfiguration } from '../hooks/useBoard';

const BoardContainer = styled.div`
    display: flex;
    flex-wrap: wrap;
    width: 360px;
    margin: 40px auxo;
    border: 1px solid gray;
`;

const Square = styled.div`
    width: 16px;
    height: 16px;
    border: 1px solid gray;
    background-color: ${(props) => props.color};
`;

export const Board = ({ size }) => {
    const [ snakePosition, foodPosition ] = useBoardConfiguration(size);
    
    const renderSquares = () => {
        const squares = [];
        for (let i = 0; i < size * size; i++) {
            if (i === snakePosition) {
                squares.push(<Square key={i} color='red'/>);
            } else if (i === foodPosition) {
                squares.push(<Square key={i} color='blue'/>);
            } else {
                squares.push(<Square key={i}/>);
            }
        }
        return squares;
    };

    return <BoardContainer>{renderSquares()}</BoardContainer>
};

export default Board;