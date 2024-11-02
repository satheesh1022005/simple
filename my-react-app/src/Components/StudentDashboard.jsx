// StudentDashboard.js
import React, { useState, useEffect } from 'react';
import { fetchContacts, updateContact } from '../api'; // Import updateContact from your API
import ContactList from './ContactList';

const StudentDashboard = ({ userPhone }) => { // Accept userPhone as a prop
    const [contacts, setContacts] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [editingContact, setEditingContact] = useState(null); // State to manage editing

    useEffect(() => {
        const loadContacts = async () => {
            const data = await fetchContacts();
            setContacts(data);
        };
        loadContacts();
    }, []);

    const filteredContacts = contacts.filter(c =>
        c.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        c.department.toLowerCase().includes(searchTerm.toLowerCase()) ||
        c.domain.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const handleEditContact = (contact) => {
        if (contact.phone === userPhone) { // Allow editing only if phone matches
            setEditingContact(contact);
        } else {
            alert("You can only edit your own contacts.");
        }
    };

    const handleUpdateContact = async (updatedContact) => {
        await updateContact(updatedContact); // Call your update API
        setContacts(contacts.map(c => (c.phone === updatedContact.phone ? updatedContact : c))); // Update the state
        setEditingContact(null); // Reset editing state
    };

    return (
        <div>
            <h1>Student Dashboard</h1>
            <input
                type="text"
                placeholder="Search by name, department, or domain"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
            />
            <ContactList 
                contacts={filteredContacts} 
                onEditContact={handleEditContact} // Pass the edit handler
                onUpdateContact={handleUpdateContact} // Pass the update handler
            />
            {editingContact && (
                <div>
                    <h2>Edit Contact</h2>
                    {/* You can create a form here to edit the contact */}
                    <input 
                        type="text" 
                        value={editingContact.name} 
                        onChange={(e) => setEditingContact({ ...editingContact, name: e.target.value })} 
                    />
                    <button onClick={() => handleUpdateContact(editingContact)}>Save</button>
                    <button onClick={() => setEditingContact(null)}>Cancel</button>
                </div>
            )}
        </div>
    );
};

export default StudentDashboard;
