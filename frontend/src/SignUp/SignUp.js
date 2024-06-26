import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './stylee.css';

function SignUp() {
    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [month, setMonth] = useState('Jan');
    const [date, setDate] = useState(1);
    const [year, setYear] = useState(2024);
    const [acceptPolicy, setAcceptPolicy] = useState(false);
    const [daysInMonth, setDaysInMonth] = useState([]);
    const [avatar, setAvatar] = useState(null);
    const [avatarPreview, setAvatarPreview] = useState(null);
    const navigate = useNavigate();

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

        const formData = new FormData();
        formData.append('email', email);
        formData.append('username', username);
        formData.append('password', password);
        formData.append('avatar', avatar);

        try {
            const response = await axios.post('http://localhost:8000/auth/register', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            console.log('Signup successful:', response.data);
            navigate('/login');
        } catch (error) {
            console.error('Error during signup:', error.response.data);
            alert(`Signup failed: ${error.response.data.message}`);
        }
    };

    const handleAvatarChange = (e) => {
        const file = e.target.files[0];
        setAvatar(file);
        setAvatarPreview(URL.createObjectURL(file));
    };

    return (
        <div className="container">
            <div className="illu">
                <h1 className='illu__header'>Welcome to CAKE</h1>
                <img src="../img/castle.png" alt="Castle illustration" className='illu__img' />
            </div>
            <form className="form" onSubmit={handleSignup}>
                <span className='form__email'>Email</span>
                <input className="form__email-input" type="text" value={email} onChange={e => setEmail(e.target.value)} />

                <span className="form__user">Username</span>
                <input className="form__user-input" type="text" value={username} onChange={e => setUsername(e.target.value)} />

                <span className="form__password">Password</span>
                <input className="form__password-input" type="password" value={password} onChange={e => setPassword(e.target.value)} />

                <span className="form__avatar">Avatar</span>
                <input className="form__avatar-input" type="file" onChange={handleAvatarChange} />
                {avatarPreview && <img src={avatarPreview} alt="Avatar Preview" className='form__avatar-preview' />}

                <select className='form__select' value={month} onChange={e => setMonth(e.target.value)}>
                    {months.map((m, index) => <option key={index} value={m}>{m}</option>)}
                </select>
                <select className='form__select-1' value={date} onChange={e => setDate(e.target.value)}>
                    {daysInMonth.map(day => <option key={day} value={day}>{day}</option>)}
                </select>
                <select className='form__select-2' value={year} onChange={e => setYear(e.target.value)}>
                    {years.reverse().map(y => <option key={y} value={y}>{y}</option>)}
                </select>
                <label className="form__control">
                    <input type="checkbox" checked={acceptPolicy} onChange={e => setAcceptPolicy(e.target.checked)} />
                    I accept Cake's policy
                </label>

                <div className='last-btn'>
                    <button type="submit" className="signup-btn">Sign up</button>
                    <button type="button" className="login-btn" onClick={() => navigate("/login")}>Already have an account? Log in</button>
                </div>
            </form>
        </div>
    );
}

export default SignUp;
