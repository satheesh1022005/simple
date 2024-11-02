import React from 'react';
import './ContactItem.css';

const ContactItem = ({ contact, onDelete, onEdit }) => {
    return (
        <li className="contact-item-card">
            <div className="contact-info">
                <p><strong>Name:</strong> {contact.name}</p>
                <p><strong>Email:</strong> {contact.email}</p>
                <p><strong>Phone:</strong> {contact.phone}</p>
                <p><strong>Address:</strong> {contact.address}</p>
            </div>
            <div className="contact-item-actions">
                <button className="edit-btn" onClick={() => onEdit(contact)}>Edit</button>
                <button className="delete-btn" onClick={() => onDelete(contact.id)}>Delete</button>
            </div>
        </li>
    );
};

export default ContactItem;
