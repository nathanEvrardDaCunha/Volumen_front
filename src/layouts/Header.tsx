import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Logout from '../features/users/logout/Logout';

export default function Header() {
    const [accessToken, setAccessToken] = useState<string | null>(null);

    useEffect(() => {
        setAccessToken(localStorage.getItem('accessToken'));
    }, []);

    return (
        <header>
            <h3>User Dashboard</h3>

            {accessToken === null ? (
                <ul className="navigation__list">
                    <li>
                        <Link to={'/login'}>
                            <button type="button">Login</button>
                        </Link>
                    </li>
                    <li>
                        <Link to={'/register'}>
                            <button type="button">Register</button>
                        </Link>
                    </li>
                </ul>
            ) : (
                <ul className="navigation__list">
                    <li>
                        <Link to={'/dashboard/home'}>
                            <button type="button">Dashboard</button>
                        </Link>
                    </li>
                    <li>
                        <Link to={'/shelves'}>
                            <button type="button">Shelves</button>
                        </Link>
                    </li>
                    <li>
                        <Logout />
                    </li>
                </ul>
            )}
        </header>
    );
}
