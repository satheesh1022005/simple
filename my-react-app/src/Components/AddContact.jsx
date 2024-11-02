// AddContact.js
import React, { useState, useEffect } from 'react';
import './AddContactStyles.css';

function AddContact({ addContact, editContact, currentContact, setCurrentContact, closeModal }) {
    const [contact, setContact] = useState({
        name: '', email: '', phone: '', address: '', department: '', domain: '', github: '', linkedin: ''
    });

    useEffect(() => {
        if (currentContact) setContact(currentContact);
        else setContact({ name: '', email: '', phone: '', address: '', department: '', domain: '', github: '', linkedin: '' });
    }, [currentContact]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setContact((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (currentContact) editContact(contact);
        else addContact(contact);
        closeModal();
    };

    return (
        <div className="modal">
            <div className="modal-content">
                <span className="close-button" onClick={closeModal}>&times;</span>
                <h2>{currentContact ? 'Edit Contact' : 'Add Contact'}</h2>
                <form onSubmit={handleSubmit}>
                    <input
                        type="text"
                        name="name"
                        placeholder="Name"
                        value={contact.name}
                        onChange={handleChange}
                        required
                    />
                    <input
                        type="email"
                        name="email"
                        placeholder="Email"
                        value={contact.email}
                        onChange={handleChange}
                        required
                    />
                    <input
                        type="text"
                        name="phone"
                        placeholder="Phone Number"
                        value={contact.phone}
                        onChange={handleChange}
                        required
                    />
                    <input
                        type="text"
                        name="address"
                        placeholder="Address"
                        value={contact.address}
                        onChange={handleChange}
                        required
                    />
                    <input
                        type="text"
                        name="department"
                        placeholder="Department"
                        value={contact.department}
                        onChange={handleChange}
                        required
                    />
                    <input
                        type="text"
                        name="domain"
                        placeholder="Domain"
                        value={contact.domain}
                        onChange={handleChange}
                        required
                    />
                    <input
                        type="url"
                        name="github"
                        placeholder="GitHub Link"
                        value={contact.github}
                        onChange={handleChange}
                        required
                    />
                    <input
                        type="url"
                        name="linkedin"
                        placeholder="LinkedIn Link"
                        value={contact.linkedin}
                        onChange={handleChange}
                        required
                    />
                    <button type="submit">{currentContact ? 'Update' : 'Add'}</button>
                </form>
            </div>
        </div>
    );
}

export default AddContact;
