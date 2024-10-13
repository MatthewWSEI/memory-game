import React, { useEffect } from 'react';
import { useGameStore } from '../store/gameStore';
import Tile from './Tile';
import { initializeTiles } from '../utils/initializedTiles';

interface GameBoardProps {
    level: string;
}

const GameBoard: React.FC<GameBoardProps> = ({ level }) => {
    const { tiles, setTiles, startTimer, stopTimer } = useGameStore();

    useEffect(() => {
        let numPairs: number;
        switch (level) {
            case 'easy':
                numPairs = 2;
                break;
            case 'medium':
                numPairs = 4;
                break;
            case 'hard':
                numPairs = 8;
                break;
            default:
                numPairs = 2;
        }

        const newTiles = initializeTiles(numPairs);
        setTiles(newTiles);
        startTimer();

        return () => {
            stopTimer();
        };
    }, [level, setTiles, startTimer, stopTimer]);

    return (
        <div className={`game-board game-board-${level}`}>
            {tiles.map((tile) => (
                <Tile key={tile.id} {...tile} onClick={() => useGameStore.getState().revealTile(tile.id)} />
            ))}
        </div>
    );
};

export default GameBoard;
