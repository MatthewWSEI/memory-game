import React from 'react';
import { useParams } from 'react-router-dom';
import GameBoard from '../components/GameBoard';
import GameStats from '../components/GameStats';
import ResetButton from '../components/ResetButton';

const GamePage: React.FC = () => {
    const { level } = useParams<{ level: string }>();

    return (
        <>
            <h1>Memory Game - {level?.toUpperCase()}</h1>
            <GameStats />
            {level && <GameBoard level={level} />}
            {level && <ResetButton level={level} />}
        </>
    );
};

export default GamePage;
