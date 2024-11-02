import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import ContactList from './Components/ContactList';
import SendMail from './Components/SendMail';
import AddContact from './Components/AddContact';
import Login from './Components/Login';
import Register from './Components/Register';
import './app.css';
import axios from 'axios';

function App() {
    const [contacts, setContacts] = useState([
    ]);
    const [search, setSearch] = useState({ department: '', domain: '' });
    const [isAddContactVisible, setIsAddContactVisible] = useState(false);
    const [editContact, setEditContact] = useState(null);
    const [user, setUser] = useState(() => {
        const savedUser = localStorage.getItem('user');
        return savedUser ? JSON.parse(savedUser) : null;
    });
    console.log(user);
    useEffect(() => {
        console.log("User state:", user); // Check if user state updates correctly
        if (user) fetchContacts();
    }, [user, search]);

    useEffect(() => {
        console.log("Contacts state updated:", contacts); // Check if contacts state updates after fetch
    }, [contacts]);

    const fetchContacts = async () => {
        try {
            console.log("Fetching contacts with search:", search); // Check search params
            const { department, domain } = search;
            const response = await axios.get('http://localhost:5000/contacts', { params: { department, domain } });
            console.log("Contacts fetched:", response.data); // Check data fetched
            setContacts(response.data);
        } catch (error) {
            console.error('Error fetching contacts:', error);
        }
    };

    const addContact = async (newContact) => {
        if (user!== 'teacher') return;
        try {
            await axios.post('http://localhost:5000/contact/add', newContact);
            fetchContacts();
        } catch (error) {
            console.error('Error adding contact:', error);
        }
    };

    const updateContact = async (updatedContact) => {
        try {
            await axios.put(`http://localhost:5000/contact/${updatedContact.id}`, updatedContact);
            fetchContacts();
            setEditContact(null);
        } catch (error) {
            console.error('Error updating contact:', error);
        }
    };

    const deleteContact = async (contactId) => {
        if (user !== 'teacher') return;
        try {
            await axios.delete(`http://localhost:5000/contact/${contactId}`);
            fetchContacts();
        } catch (error) {
            console.error('Error deleting contact:', error);
        }
    };

    const toggleAddContactForm = () => {
        setIsAddContactVisible(!isAddContactVisible);
        console.log("isAddContactVisible:", !isAddContactVisible); // Check toggle state
    };

    const handleLogin = (userData) => {
        console.log("User logging in:", userData); // Check user data on login
        setUser(userData);
        localStorage.setItem('user', JSON.stringify(userData));
    };

    const handleLogout = () => {
        setUser(null);
        localStorage.removeItem('user');
    };

    return (
        <Router>
            <div className="app-container">
                <Routes>
                    <Route path="/login" element={<Login setRole={handleLogin} />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="/" element={user ? (
                        <>
                            <div>
                                <button onClick={handleLogout}>logout</button>
                            </div>
                            <ContactList
                                contacts={contacts}
                                search={search}
                                setSearch={setSearch}
                                setEditContact={setEditContact}
                                deleteContact={user === 'teacher' ? deleteContact : null}
                            />
                            {user === 'teacher' && (
                                <button className="fab" onClick={toggleAddContactForm}>
                                    <span>+</span>
                                </button>
                            )}
                            {(isAddContactVisible || editContact) && (
                                <div className="add-contact-modal">
                                    <AddContact
                                        closeModal={() => {
                                            setIsAddContactVisible(false);
                                            setEditContact(null);
                                        }}
                                        addContact={addContact}
                                        editContact={editContact}
                                        updateContact={updateContact}
                                    />
                                </div>
                            )}
                        </>
                    ) : (
                        <Navigate to="/register" />
                    )} />
                    <Route path="/send-mail/:email" element={user ? <SendMail /> : <Navigate to="/login" />} />
                </Routes>
            </div>
        </Router>
    );
}

export default App;
