import { useState, useEffect } from 'react';

const randomPosition = () => Math.floor(Math.random() * 399);

export const useBoardConfiguration = (size) => {
    const DIMENSION = size * size;
    const LIMIT = DIMENSION - size;

    const [snakePosition, setSnakePosition] = useState(0);
    const [foodPosition, setFoodPosition] = useState(randomPosition);

    useEffect(() => {
        const handleFood = (nextSnakePosition) => {
            if (nextSnakePosition === foodPosition) {
                let nextFoodPosition = randomPosition();
                while (nextFoodPosition === snakePosition) {
                    nextFoodPosition = randomPosition();
                }
                setTimeout(setFoodPosition(nextFoodPosition), 500);
            }
        };

        const handleMovement = (d) => {
            const nextPosition = snakePosition + d;
            setSnakePosition(nextPosition);
            handleFood(nextPosition);
        };

        const handleKeyDown = (event) => {
            if (event.keyCode === 40 && snakePosition < LIMIT) {
                handleMovement(size);
            } else if (event.keyCode === 39 && (snakePosition + 1) % 20 !== 0) {
                handleMovement(1);
            } else if (event.keyCode === 38 && snakePosition >= size) {
                handleMovement(-size);
            } else if (event.keyCode === 37 && snakePosition % 20 !== 0) {
                handleMovement(-1);
            }
        };

        window.addEventListener('keydown', handleKeyDown);

        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [snakePosition, foodPosition]);

    return [snakePosition, foodPosition];
};