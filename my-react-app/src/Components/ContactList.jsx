import React from 'react';
import './ContactList.css';

function ContactList({ contacts, onDelete, onEdit, search, setSearch }) {
    const user = JSON.parse(localStorage.getItem('user')) || {};

    // Handle changes in search input fields
    const handleSearchChange = (e) => {
        const { name, value } = e.target;
        setSearch((prev) => ({ ...prev, [name]: value }));
    };

    // Filter contacts based on search criteria
    const filteredContacts = contacts.filter(contact => {
        return (
            contact.name.toLowerCase().includes(search.name.toLowerCase()) &&
            contact.department.toLowerCase().includes(search.department.toLowerCase()) &&
            contact.domain.toLowerCase().includes(search.domain.toLowerCase())
        );
    });

    console.log("Filtered Contacts:", filteredContacts); // Debugging line

    return (
        <div className="contact-list">
            <h2>Contact List</h2>
            <div className="search-container">
                <input
                    type="text"
                    placeholder="Search by Name..."
                    name="name"
                    value={search.name}
                    onChange={handleSearchChange}
                />
                <input
                    type="text"
                    placeholder="Search by Department..."
                    name="department"
                    value={search.department}
                    onChange={handleSearchChange}
                />
                <input
                    type="text"
                    placeholder="Search by Domain..."
                    name="domain"
                    value={search.domain}
                    onChange={handleSearchChange}
                />
            </div>
            <ul className="contact-cards">
                {filteredContacts.length > 0 ? (
                    filteredContacts.map((contact) => (
                        <li key={contact.id} className="contact-card">
                            <div className="contact-details">
                                <p><strong>Name:</strong> {contact.name}</p>
                                <p><strong>Email:</strong> {contact.email}</p>
                                <p><strong>Phone:</strong> {contact.phone}</p>
                                <p><strong>Department:</strong> {contact.department}</p>
                                <p><strong>Domain:</strong> {contact.domain}</p>
                            </div>
                            <div className="contact-actions">
                                <button onClick={() => onEdit(contact)}>Edit</button>
                                <button onClick={() => onDelete(contact.id)}>Delete</button>
                            </div>
                        </li>
                    ))
                ) : (
                    <p>No contacts found.</p>
                )}
            </ul>
        </div>
    );
}

export default ContactList;
