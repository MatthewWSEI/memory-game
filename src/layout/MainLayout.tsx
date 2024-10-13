import { Link, Outlet } from 'react-router-dom';

const MainLayout = () => {
    return (
        <div className="app">
            <div className="container">
                <header className="header">
                    <div className="container">
                        <div className="logo">
                            <Link to="/">Memory Game</Link>
                        </div>
                        <nav className="nav">
                            <ul>
                                <li>
                                    <Link to="/">Home</Link>
                                </li>
                                <li>
                                    <Link to="stats">Stats</Link>
                                </li>
                            </ul>
                        </nav>
                    </div>
                </header>
                <Outlet />
            </div>
        </div>
    );
};

export default MainLayout;
