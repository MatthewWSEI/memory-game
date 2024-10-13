import React from 'react';
import { useGameStore } from '../store/gameStore';

const GameStats: React.FC = () => {
    const attempts = useGameStore((state) => state.attempts);
    const elapsedTime = useGameStore((state) => state.elapsedTime);

    return (
        <div className="game-stats">
            <div>Attempts: {attempts}</div>
            <div>Time Elapsed: {elapsedTime} seconds</div>
        </div>
    );
};

export default GameStats;
