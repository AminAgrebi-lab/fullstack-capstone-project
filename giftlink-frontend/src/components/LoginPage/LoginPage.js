import React, { useState, useEffect } from 'react';
import './LoginPage.css';

// Task 1 (Step 1): Import urlConfig
import { urlConfig } from '../../config';

// Task 2 (Step 1): Import useAppContext
import { useAppContext } from '../../context/AuthContext';

// Task 3 (Step 1): Import useNavigate
import { useNavigate } from 'react-router-dom';

function LoginPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    // Task 4 (Step 1): State for incorrect password
    const [incorrect, setIncorrect] = useState('');

    // Task 5 (Step 1): Create local variables for navigation and AuthContext
    const navigate = useNavigate();
    const bearerToken = sessionStorage.getItem('bearer-token');
    
    // 💡 تم إضافة setUserName هنا لتحديث اسم المستخدم في Context فور تسجيل الدخول
    const { setIsLoggedIn, setUserName } = useAppContext();

    // Task 6 (Step 1): Redirect if user is already logged in
    useEffect(() => {
        if (sessionStorage.getItem('auth-token')) {
            navigate('/app');
        }
    }, [navigate]);

    const handleLogin = async () => {
        try {
            const res = await fetch(`${urlConfig.backendUrl}/api/auth/login`, {
                method: 'POST',
                headers: {
                    'content-type': 'application/json',
                    'Authorization': bearerToken ? `Bearer ${bearerToken}` : '',
                },
                body: JSON.stringify({
                    email: email,
                    password: password,
                }),
            });

            const json = await res.json();

            if (json.authtoken) {
                // تحديد الاسم القادم من الـ Backend مع حلول احتياطية
                const nameToStore = json.userName || json.name || json.username || (json.userEmail ? json.userEmail.split('@')[0] : email.split('@')[0]);

                // Task 2 (Step 2): Save details in sessionStorage
                sessionStorage.setItem('auth-token', json.authtoken);
                sessionStorage.setItem('name', nameToStore);
                sessionStorage.setItem('email', json.userEmail || email);

                // Task 3 (Step 2): Update Context states immediately
                setIsLoggedIn(true);
                setUserName(nameToStore); // 👈 يضمن ظهور الاسم فوراً في الـ Navbar

                // Task 4 (Step 2): Navigate to MainPage
                navigate('/app');
            } else {
                // Task 5 (Step 2): Clear inputs and show error
                setEmail("");
                setPassword("");
                setIncorrect("Wrong password. Try again.");

                setTimeout(() => {
                    setIncorrect("");
                }, 2000);
            }

        } catch (e) {
            console.log("Error fetching details: " + e.message);
        }
    };

    return (
        <div className="container mt-5">
            <div className="row justify-content-center">
                <div className="col-md-6 col-lg-4">
                    <div className="login-card p-4 border rounded">
                        <h2 className="text-center mb-4 font-weight-bold">Login</h2>

                        {/* Email Input */}
                        <div className="mb-3">
                            <label htmlFor="email" className="form-label">Email</label>
                            <input
                                id="email"
                                type="email"
                                className="form-control"
                                placeholder="Enter your email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>

                        {/* Password Input */}
                        <div className="mb-4">
                            <label htmlFor="password" className="form-label">Password</label>
                            <input
                                id="password"
                                type="password"
                                className="form-control"
                                placeholder="Enter your password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />

                            {/* Error Message */}
                            <span style={{ color: 'red', height: '.5cm', display: 'block', fontStyle: 'italic', fontSize: '12px' }}>
                                {incorrect}
                            </span>
                        </div>

                        {/* Login Button */}
                        <button className="btn btn-primary w-100 mb-3" onClick={handleLogin}>
                            Login
                        </button>

                        <p className="mt-4 text-center">
                            New member? <a href="/app/register" className="text-primary">Register Here</a>
                        </p>

                    </div>
                </div>
            </div>
        </div>
    );
}

export default LoginPage;