import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useGameStore } from '../store/gameStore';

interface ResetButtonProps {
    level: string;
}

const ResetButton: React.FC<ResetButtonProps> = ({ level }) => {
    const navigate = useNavigate();
    const { resetGame } = useGameStore();

    const handleReset = () => {
        resetGame(level);
        navigate(`/game/${level}`);
    };

    return (
        <button className="reset-button" onClick={handleReset}>
            Reset
        </button>
    );
};

export default ResetButton;
