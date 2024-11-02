import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import emailjs from 'emailjs-com';
import './SendMail.css';

function SendMail() {
    const { email } = useParams();  // Capture email from the URL parameter
    const [subject, setSubject] = useState('');
    const [body, setBody] = useState('');
    const [mailSent, setMailSent] = useState(false);

    const handleSend = (e) => {
        e.preventDefault();

        const templateParams = {
            to_email: email,  // Use the email captured from params
            subject: subject,
            message: body,
        };

        emailjs.send('service_mh1epu4', 'template_8ci4hmj', templateParams, 'ODADuyhrILN8AFPiN')
            .then((response) => {
                console.log('Email sent successfully!', response.status, response.text);
                setMailSent(true); // Show mail sent notification
                setSubject('');     // Clear form fields
                setBody('');
            })
            .catch((error) => {
                console.error('Failed to send email:', error);
            });
    };

    return (
        <div className="send-mail">
            <h2>Send Email</h2>
            <form onSubmit={handleSend} className="send-mail-form">
                <label><strong>To:</strong> {email}</label>  {/* Display the selected email */}
                <input
                    type="text"
                    placeholder="Subject"
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                    required
                />
                <textarea
                    placeholder="Message"
                    value={body}
                    onChange={(e) => setBody(e.target.value)}
                    required
                />
                <button type="submit" className="send-button">Send</button>
            </form>

            {mailSent && (
                <div className="mail-sent-popup">
                    <p>Mail Sent Successfully!</p>
                    <button onClick={() => setMailSent(false)}>Close</button>
                </div>
            )}
        </div>
    );
}

export default SendMail;
