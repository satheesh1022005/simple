// Login.js
import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

const Login = ({ setRole }) => {
    const [credentials, setCredentials] = useState({ phone: '', password: '', role: '' });
    const navigate = useNavigate();

    const handleChange = (e) => setCredentials({ ...credentials, [e.target.name]: e.target.value });

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Submitted Credentials:", credentials); // Log submitted credentials for debugging

        // Mock authentication logic
        if (credentials.role === 'teacher') {
            setRole('teacher');
            navigate('/');
        } else if (credentials.role === 'student') {
            setRole('student');
            navigate('/');
        } else {
            alert('Invalid role');
        }
    };

    return (
        <div className="login-container">
            <h2>Login</h2>
            <form onSubmit={handleSubmit}>
                <input 
                    type="text" 
                    name="phone" 
                    placeholder="Phone" 
                    onChange={handleChange} 
                    required 
                />
                <input 
                    type="password" 
                    name="password" 
                    placeholder="Password" 
                    onChange={handleChange} 
                    required 
                />
                <select name="role" onChange={handleChange} required>
                    <option value="">Select Role</option>
                    <option value="student">Student</option>
                    <option value="teacher">Teacher</option>
                </select>
                <button type="submit">Login</button>
            </form>
            <p>
                New user? <Link to="/register">Register here</Link>
            </p>
        </div>
    );
};

export default Login;
