const express = require('express');
const router = express.Router();
const Contact = require('./models/Contact');

// Retrieve all contacts, optionally filtering by department and domain
router.get('/', async (req, res) => {
    try {
        const { department, domain } = req.query;

        let query = {};
        if (department) query.department = department;
        if (domain) query.domain = domain;

        const contacts = await Contact.find(query);
        res.status(200).json(contacts);
    } catch (error) {
        console.error('Error retrieving contacts:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});

// Add a new contact
router.post('/add', async (req, res) => {
    const { name, email, phone, address, department, domain, github, linkedin } = req.body;

    const newContact = new Contact({
        photo,
        name,
        email,
        phone,
        address,
        department,
        domain,
        github,
        linkedin
    });

    try {
        const savedContact = await newContact.save();
        res.status(201).json(savedContact);
    } catch (error) {
        console.error('Error adding contact:', error);
        res.status(400).json({ message: 'Bad Request' });
    }
});

// Update an existing contact
router.put('/:id', async (req, res) => {
    const { id } = req.params;
    const updatedData = req.body;

    try {
        const updatedContact = await Contact.findByIdAndUpdate(id, updatedData, { new: true });
        if (!updatedContact) return res.status(404).json({ message: 'Contact not found' });
        res.status(200).json(updatedContact);
    } catch (error) {
        console.error('Error updating contact:', error);
        res.status(400).json({ message: 'Bad Request' });
    }
});

// Delete a contact
router.delete('/:id', async (req, res) => {
    const { id } = req.params;

    try {
        const deletedContact = await Contact.findByIdAndDelete(id);
        if (!deletedContact) return res.status(404).json({ message: 'Contact not found' });
        res.status(204).send(); // No content to send back
    } catch (error) {
        console.error('Error deleting contact:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});

module.exports = router;
