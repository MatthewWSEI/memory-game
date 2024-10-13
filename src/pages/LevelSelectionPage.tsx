import React from 'react';
import { useNavigate } from 'react-router-dom';

const LevelSelectionPage: React.FC = () => {
    const navigate = useNavigate();

    const handleLevelSelect = (level: string) => {
        navigate(`/game/${level}`);
    };

    return (
        <div className="level-selection-page">
            <h1>Select Difficulty</h1>
            <div className="buttons">
                <button onClick={() => handleLevelSelect('easy')}>Easy</button>
                <button onClick={() => handleLevelSelect('medium')}>Medium</button>
                <button onClick={() => handleLevelSelect('hard')}>Hard</button>
            </div>
        </div>
    );
};

export default LevelSelectionPage;
