// api.js
const API_URL = 'http://localhost:5000/students';

export const fetchContacts = async () => {
    const response = await fetch(API_URL);
    if (!response.ok) throw new Error('Failed to fetch contacts');
    return await response.json();
};

export const addContact = async (contact) => {
    const response = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(contact),
    });
    if (!response.ok) throw new Error('Failed to add contact');
    return await response.json();
};

export const updateContact = async (id, contact) => {
    const response = await fetch(`${API_URL}/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(contact),
    });
    if (!response.ok) throw new Error('Failed to update contact');
    return await response.json();
};

export const deleteContact = async (id) => {
    const response = await fetch(`${API_URL}/${id}`, {
        method: 'DELETE',
    });
    if (!response.ok) throw new Error('Failed to delete contact');
    return await response.json();
};
