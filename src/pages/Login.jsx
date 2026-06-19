import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../css/Login.css";

export const Login = () => {
    const navigate = useNavigate();

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const [notification, setNotification] = useState({
        show: false,
        type: "",
        message: "",
    });

    const handleLogin = (e) => {
        e.preventDefault();

        if (!username || !password) {
            setNotification({
                show: true,
                type: "error",
                message: "Please fill in all fields.",
            });
            return;
        }

        if (username === "admin" && password === "123456") {

            localStorage.setItem("user", "loggedIn");

            setNotification({
                show: true,
                type: "success",
                message: "Login successful!",
            });

            setTimeout(() => {
                navigate("/dashboard");
            }, 1500);

        } else {
            setNotification({
                show: true,
                type: "error",
                message: "Incorrect username or password.",
            });
        }
    };

    return (
        <div className="login-page-container">
            
            {notification.show && (
                <div className={`notification-toast ${notification.type}`}>
                    <strong>
                        {notification.type === "success" ? "Success: " : "Error: "}
                    </strong>
                    <span>{notification.message}</span>
                </div>
            )}

            <div className="login-card">
                
                <div className="left-panel">
                    <div className="logo-container">
                        <svg className="logo-icon" viewBox="0 0 100 85" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <g transform="translate(18, 5) scale(0.68)">
                                <path 
                                d="M19.5 25C11 25 5 31 5 40C5 49 12 55 21 55H74C84 55 91 47 91 37C91 27 83 20 73 20C71 11 61 5 50 5C39 5 30 12 27 22C24.5 20.5 22 20 19.5 20" 
                                stroke="white" 
                                strokeWidth="9" 
                                strokeLinecap="round" 
                                strokeLinejoin="round"
                                />
                                <path d="M32 68V76" stroke="white" strokeWidth="9" strokeLinecap="round"/>
                                <path d="M50 71V79" stroke="white" strokeWidth="9" strokeLinecap="round"/>
                                <path d="M68 68V76" stroke="white" strokeWidth="9" strokeLinecap="round"/>
                            </g>
                        </svg>
                        
                        <div className="logo-text">
                            <span className="logo-main">Prime</span>
                            <span className="logo-sub">Horizon</span>
                        </div>
                    </div>
                    
                    <div className="geometric-art-shapes"></div>
                    
                    <div className="welcome-text">
                        <p>Welcome To</p>
                        <h3>Prime Horizon</h3>
                    </div>
                </div>

                <div className="right-panel">
                    <h2>Login</h2>
                    
                    <form onSubmit={handleLogin} className="login-form">
                        <div className="input-group">
                            <input
                                type="text"
                                placeholder="Username"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                            />
                        </div>

                        <div className="input-group">
                            <input
                                type="password"
                                placeholder="Password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>

                        <button type="submit" className="btn-login">
                            LOGIN
                        </button>
                    </form>

                    <div className="support-footer">
                        If you are having trouble please contact <br />
                        <a href="primehorizon@gmail.com">primehorizon@gmail.com</a>
                    </div>
                </div>

            </div>
        </div>
    );
};