import create from 'zustand';
import { initializeTiles } from '../utils/initializedTiles';

interface Tile {
    id: number;
    image: string;
    isRevealed: boolean;
    isMatched: boolean;
}

interface GameState {
    tiles: Tile[];
    attempts: number;
    matchedPairs: number;
    startTime: number | null;
    elapsedTime: number;
    revealedTiles: Tile[];
    intervalId: ReturnType<typeof setInterval> | null;
    level: string;
    revealTile: (id: number) => void;
    resetGame: (level: string) => void;
    startTimer: () => void;
    stopTimer: () => void;
    setTiles: (tiles: Tile[]) => void;
    setLevel: (level: string) => void;
    saveGameStats: () => void;
}

export const useGameStore = create<GameState>((set, get) => ({
    tiles: [],
    attempts: 0,
    matchedPairs: 0,
    startTime: null,
    elapsedTime: 0,
    revealedTiles: [],
    intervalId: null,
    level: 'easy',

    setTiles: (tiles) => set({ tiles }),

    setLevel: (level) => set({ level }),

    revealTile: (id) => {
        const { tiles, revealedTiles, attempts } = get();
        const clickedTile = tiles.find((tile) => tile.id === id);

        if (!clickedTile || clickedTile.isRevealed || clickedTile.isMatched) {
            return;
        }

        const updatedTiles = tiles.map((tile) => (tile.id === id ? { ...tile, isRevealed: true } : tile));

        const newRevealedTiles = [...revealedTiles, clickedTile];

        if (newRevealedTiles.length === 1) {
            set({ tiles: updatedTiles, revealedTiles: newRevealedTiles });
        } else if (newRevealedTiles.length === 2) {
            const [firstTile, secondTile] = newRevealedTiles;

            set({
                tiles: updatedTiles,
                revealedTiles: newRevealedTiles,
                attempts: attempts + 1,
            });

            if (firstTile.image === secondTile.image) {
                const matchedTiles = updatedTiles.map((tile) => (tile.id === firstTile.id || tile.id === secondTile.id ? { ...tile, isMatched: true } : tile));

                set({
                    tiles: matchedTiles,
                    revealedTiles: [],
                    matchedPairs: get().matchedPairs + 1,
                });

                if (matchedTiles.every((tile) => tile.isMatched)) {
                    get().stopTimer();
                    get().saveGameStats();
                }
            } else {
                setTimeout(() => {
                    const resetTiles = updatedTiles.map((tile) => (tile.id === firstTile.id || tile.id === secondTile.id ? { ...tile, isRevealed: false } : tile));
                    set({ tiles: resetTiles, revealedTiles: [] });
                }, 1000);
            }
        }
    },

    startTimer: () => {
        const { intervalId } = get();

        if (!intervalId) {
            const startTime = Date.now();
            const newIntervalId = setInterval(() => {
                set({ elapsedTime: Math.floor((Date.now() - startTime) / 1000) });
            }, 1000);

            set({ startTime, intervalId: newIntervalId });
        }
    },

    stopTimer: () => {
        const { intervalId } = get();
        if (intervalId) {
            clearInterval(intervalId);
            set({ intervalId: null });
        }
    },

    resetGame: (level: string) => {
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

        get().stopTimer();

        set({
            tiles: newTiles,
            attempts: 0,
            matchedPairs: 0,
            startTime: null,
            elapsedTime: 0,
            revealedTiles: [],
            level,
        });

        get().startTimer();
    },

    saveGameStats: () => {
        const { attempts, elapsedTime, level } = get();
        const finishedAt = new Date().toLocaleString();

        const gameStats = {
            attempts,
            duration: elapsedTime,
            level,
            finishedAt,
        };

        const storedStats = localStorage.getItem('memoryGameStats');
        const stats = storedStats ? JSON.parse(storedStats) : [];

        stats.push(gameStats);

        localStorage.setItem('memoryGameStats', JSON.stringify(stats));
    },
}));
