// TeacherDashboard.js
import React, { useState, useEffect } from 'react';
import { fetchContacts, addContact, updateContact, deleteContact } from '../api';
import AddContact from './AddContact';
import ContactList from './ContactList';

const TeacherDashboard = () => {
    const [contacts, setContacts] = useState([]);
    const [currentContact, setCurrentContact] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [modalOpen, setModalOpen] = useState(false);

    useEffect(() => {
        const loadContacts = async () => {
            const data = await fetchContacts();
            setContacts(data);
        };
        loadContacts();
    }, []);

    const handleAddContact = async (contact) => {
        const newContact = await addContact(contact);
        setContacts([...contacts, newContact]);
    };

    const handleEditContact = async (contact) => {
        const updatedContact = await updateContact(currentContact._id, contact);
        setContacts(contacts.map(c => (c._id === updatedContact._id ? updatedContact : c)));
        setCurrentContact(null);
    };

    const handleDeleteContact = async (id) => {
        await deleteContact(id);
        setContacts(contacts.filter(c => c._id !== id));
    };

    const filteredContacts = contacts.filter(c =>
        c.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        c.department.toLowerCase().includes(searchTerm.toLowerCase()) ||
        c.domain.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div>
            <h1>Teacher Dashboard</h1>
            <input
                type="text"
                placeholder="Search by name, department, or domain"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
            />
            <button onClick={() => setModalOpen(true)}>Add Contact</button>
            <ContactList contacts={filteredContacts} setCurrentContact={setCurrentContact} onDelete={handleDeleteContact} />
            {modalOpen && (
                <AddContact
                    addContact={handleAddContact}
                    editContact={handleEditContact}
                    currentContact={currentContact}
                    setCurrentContact={setCurrentContact}
                    closeModal={() => {
                        setModalOpen(false);
                        setCurrentContact(null);
                    }}
                />
            )}
        </div>
    );
};

export default TeacherDashboard;
