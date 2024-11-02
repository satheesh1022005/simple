import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';

const Register = () => {
    const [userData, setUserData] = useState({ phone: '', password: '', role: 'student' });
    const navigate = useNavigate();

    useEffect(() => {
        // Check if the user is already logged in
        const savedUser = localStorage.getItem('user');
        if (savedUser) {
            navigate('/contactlist'); // Redirect to the contact list if user is already logged in
        }
    }, [navigate]);

    const handleChange = (e) => setUserData({ ...userData, [e.target.name]: e.target.value });

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post('http://localhost:5000/register', userData);
            navigate('/login'); // Redirect to login page after successful registration
        } catch (error) {
            console.error('Error registering user:', error);
        }
    };

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <input type="text" name="phone" placeholder="Phone" onChange={handleChange} required />
                <input type="password" name="password" placeholder="Password" onChange={handleChange} required />
                <select name="role" onChange={handleChange} value={userData.role}>
                    <option value="student">Student</option>
                    <option value="teacher">Teacher</option>
                </select>
                <button type="submit">Register</button>
            </form>
            <p>
                Existing user? <Link to="/login">Login here</Link>
            </p>
        </div>
    );
};

export default Register;
