import { Suspense } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import GamePage from './pages/GamePage';
import StatsPage from './pages/StatsPage';
import MainLayout from './layout/MainLayout';
import LevelSelectionPage from './pages/LevelSelectionPage';
import './styles/main.scss';

const App: React.FC = () => {
    return (
        <BrowserRouter>
            <Suspense fallback={'...'}>
                <Routes>
                    <Route element={<MainLayout />} path="/">
                        <Route index element={<LevelSelectionPage />} />
                        <Route path="/game/:level" element={<GamePage />} />
                        <Route path="/stats" element={<StatsPage />} />
                        <Route path="*" element={<div>Not Found</div>} />
                    </Route>
                </Routes>
            </Suspense>
        </BrowserRouter>
    );
};

export default App;
