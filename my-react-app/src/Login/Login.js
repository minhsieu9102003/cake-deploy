import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './stylee.css';

function Login() {
    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [month, setMonth] = useState('');
    const [date, setDate] = useState('');
    const [year, setYear] = useState('');
    const [acceptPolicy, setAcceptPolicy] = useState(false);
    const [daysInMonth, setDaysInMonth] = useState([]);

    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    const years = Array.from({ length: (2024 - 1924 + 1) }, (_, index) => 1924 + index);

    useEffect(() => {
        function updateDays() {
            const monthIndex = months.indexOf(month);
            const days = new Date(year, monthIndex + 1, 0).getDate();
            setDaysInMonth(Array.from({ length: days }, (_, i) => i + 1));
        }
        if (month && year) {
            updateDays();
        }
    }, [month, year]);

    const handleSignup = async (e) => {
        e.preventDefault();
        if (!acceptPolicy) {
            alert("You must accept the policy to sign up.");
            return;
        }

        try {
            const response = await axios.post('http://localhost:8000/auth/register', {
                email,
                username,
                password
            });
            console.log('Signup successful:', response.data);
            alert("Signup successful!");
        } catch (error) {
            console.error('Error during signup:', error.response.data);
            alert(`Signup failed: ${error.response.data.message}`);
        }
    };

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:8000/auth/login', {
                username,
                password
            });
            console.log('Login successful:', response.data);
            alert("Login successful!");
        } catch (error) {
            //console.error('Error during login:', error.response.data);
            //alert(`Login failed: ${error.response.data.message}`);
        }
    };

    return (
        <div className="container">
            <div className="illu">
                <h1 className='illu__header'>Welcome to CAKE</h1>
                <img src="../img/castle.png" alt="Castle illustration" className='illu__img' />
            </div>
            <form className="form">
                <span className="form__user">Username</span>
                <input className="form__user-input" type="text" value={username} onChange={e => setUsername(e.target.value)} />

                <span className="form__password">Password</span>
                <input className="form__password-input" type="password" value={password} onChange={e => setPassword(e.target.value)} />

                
                <button type="submit" className="login-btn" onClick={handleLogin}>Login</button>
                <button type="button" className="Signup-btn">Don't have an account? Sign up</button>
            </form>
        </div>
    );
}

export default Login;
