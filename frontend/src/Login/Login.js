import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./stylee.css";

function Login() {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [month, setMonth] = useState("");
  const [date, setDate] = useState("");
  const [year, setYear] = useState("");
  const [acceptPolicy, setAcceptPolicy] = useState(false);
  const [daysInMonth, setDaysInMonth] = useState([]);
  const navigate = useNavigate();
  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  const years = Array.from(
    { length: 2024 - 1924 + 1 },
    (_, index) => 1924 + index
  );

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
      const response = await axios.post("http://localhost:8000/auth/register", {
        email,
        username,
        password,
      });
      console.log("Signup successful:", response.data);
      //alert("Signup successful!");
    } catch (error) {
      console.error("Error during signup:", error.response.data);
      //alert(`Signup failed: ${error.response.data.message}`);
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
        const response = await axios.post('http://localhost:8000/auth/login', {
            email,
            password
        });

        console.log('Login response:', response);

        const { token, userId } = response.data;

        if (!token || !userId) {
            throw new Error('Invalid login response: missing token or userId');
        }

        // Store the token and userId in localStorage
        localStorage.setItem('token', token);
        localStorage.setItem('userId', userId);

        // Parse and store the token payload
        const parsedToken = parseJwt(token);
        localStorage.setItem('userPayload', JSON.stringify(parsedToken));

        // Check if the token and userId are stored correctly
        const storedToken = localStorage.getItem('token');
        const storedUserId = localStorage.getItem('userId');

        if (storedToken && storedUserId) {
            //alert('Login successful!');
            navigate('/main');
        } else {
            alert('Failed to store user credentials. Please try again.');
        }
    } catch (error) {
        console.error('Error during login:', error.response?.data || error.message);
        alert(`Login failed: ${error.response?.data?.message || error.message}`);
    }
};

// Function to parse JWT
function parseJwt(token) {
    try {
        const base64Url = token.split('.')[1];
        const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
        const jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
            return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
        }).join(''));

        return JSON.parse(jsonPayload);
    } catch (error) {
        console.error('Failed to parse JWT:', error);
        return null;
    }
}

  return (
    <div className="container">
      <div className="illu">
        <h1 className="illu__header">Welcome to CAKE</h1>
        <img
          src="../img/castle.png"
          alt="Castle illustration"
          className="illu__img"
        />
      </div>
      <form className="form">
        <span className="form__email">Email</span>
        <input
          className="form__email-input"
          type="text"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <span className="form__password">Password</span>
        <input
          className="form__password-input"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button type="submit" className="login-btn" onClick={handleLogin}>
          Login
        </button>
        <button type="button" className="Signup-btn">
          Don't have an account? Sign up
        </button>
      </form>
    </div>
  );
}

export default Login;
