import React from 'react';

interface TileProps {
    id: number;
    image: string;
    isRevealed: boolean;
    isMatched: boolean;
    onClick: (id: number) => void;
}

const Tile: React.FC<TileProps> = ({ id, image, isRevealed, isMatched, onClick }) => {
    return (
        <div className={`tile ${isRevealed ? 'revealed' : ''} ${isMatched ? 'matched' : ''}`} onClick={() => !isMatched && !isRevealed && onClick(id)}>
            {isRevealed || isMatched ? <img src={image} alt={`Tile ${id}`} /> : <span>?</span>}
        </div>
    );
};

export default Tile;
