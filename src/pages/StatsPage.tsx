import React from 'react';
import Statistics from '../components/Statistics';

const StatsPage: React.FC = () => {
    return (
        <div className="stats-page">
            <h1>Stats Game Memory</h1>
            <Statistics />
        </div>
    );
};

export default StatsPage;
