import React, { useEffect, useState } from 'react';

const Statistics: React.FC = () => {
    const [statistics, setStatistics] = useState<{ finishedAt: string; attempts: number; duration: number }[]>([]);

    const getStatistics = () => {
        const stats = localStorage.getItem('memoryGameStats');
        if (stats) {
            return JSON.parse(stats);
        }
        return [];
    };

    useEffect(() => {
        const stats = getStatistics();
        setStatistics(stats);
    }, []);

    return (
        <div className="statistics">
            {statistics.length > 0 ? (
                <table>
                    <thead>
                        <tr>
                            <th>Date</th>
                            <th>Number of attempts</th>
                            <th>Duration (s)</th>
                        </tr>
                    </thead>
                    <tbody>
                        {statistics.map((stat, index) => (
                            <tr key={index}>
                                <td>{stat.finishedAt}</td>
                                <td>{stat.attempts}</td>
                                <td>{stat.duration}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            ) : (
                <p>No statistics to display.</p>
            )}
        </div>
    );
};

export default Statistics;
