import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAppContext } from '../../context/AuthContext';
import './Navbar.css';

export default function Navbar() {
    const { isLoggedIn, setIsLoggedIn, userName, setUserName } = useAppContext();
    const navigate = useNavigate();

    useEffect(() => {
        const authTokenFromSession = sessionStorage.getItem('auth-token');
        const nameFromSession = sessionStorage.getItem('name');

        if (authTokenFromSession) {
            setIsLoggedIn(true);
            if (nameFromSession) {
                setUserName(nameFromSession);
            } else {
                const emailFromSession = sessionStorage.getItem('email');
                if (emailFromSession) {
                    setUserName(emailFromSession.split('@')[0]);
                }
            }
        }
    }, [setIsLoggedIn, setUserName]);

    const handleLogout = () => {
        sessionStorage.removeItem('auth-token');
        sessionStorage.removeItem('name');
        sessionStorage.removeItem('email');
        setIsLoggedIn(false);
        navigate('/app');
    };

    const profileSection = () => {
        navigate('/app/profile');
    };

    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light" id="navbar_container">
            <Link className="navbar-brand fw-bold" to="/app">GiftLink</Link>

            <button 
                className="navbar-toggler" 
                type="button" 
                data-bs-toggle="collapse" 
                data-bs-target="#navbarNav" 
                aria-controls="navbarNav" 
                aria-expanded="false" 
                aria-label="Toggle navigation"
            >
                <span className="navbar-toggler-icon"></span>
            </button>

            <div className="collapse navbar-collapse justify-content-end" id="navbarNav">
                <ul className="navbar-nav ms-auto align-items-center">
                    <li className="nav-item">
                        {/* استخدام a href إذا كانت صفحة static HTML خارجية */}
                        <a className="nav-link nav-link-custom" href="/home.html">Home</a>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link nav-link-custom" to="/app">Gifts</Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link nav-link-custom" to="/app/search">Search</Link>
                    </li>

                    {isLoggedIn ? (
                        <>
                            <li className="nav-item">
                                <span 
                                    className="nav-link fw-bold text-dark me-2" 
                                    style={{ cursor: "pointer" }} 
                                    onClick={profileSection}
                                >
                                    Welcome, {userName}
                                </span>
                            </li>
                            <li className="nav-item">
                                <button className="btn btn-success nav-btn-green" onClick={handleLogout}>
                                    Logout
                                </button>
                            </li>
                        </>
                    ) : (
                        <>
                            <li className="nav-item">
                                <Link className="btn btn-success nav-btn-green me-2" to="/app/login">Login</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link nav-link-custom" to="/app/register">Register</Link>
                            </li>
                        </>
                    )}
                </ul>
            </div>
        </nav>
    );
}