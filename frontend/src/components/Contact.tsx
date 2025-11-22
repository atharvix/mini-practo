import React, { useState } from 'react';
import { Button } from './Button';
import { Card } from './Card';
import { Icons } from './Icons';
import './Contact.css';
import './Form.css';

export const Contact: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, this would send to a backend
    console.log('Form submitted:', formData);
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setFormData({ name: '', email: '', subject: '', message: '' });
    }, 3000);
  };

  return (
    <div className="contact-container">
      <div className="contact-hero">
        <h1>Get in Touch</h1>
        <p>We'd love to hear from you. Send us a message and we'll respond as soon as possible.</p>
      </div>

      <div className="contact-content">
        <div className="contact-info">
          <Card className="info-card">
            <Icons.Contact className="info-icon" />
            <h3>Email</h3>
            <p>support@hms.com</p>
            <p>info@hms.com</p>
          </Card>

          <Card className="info-card">
            <Icons.Phone className="info-icon" />
            <h3>Phone</h3>
            <p>+1 (555) 123-4567</p>
            <p>+1 (555) 987-6543</p>
          </Card>

          <Card className="info-card">
            <Icons.Location className="info-icon" />
            <h3>Address</h3>
            <p>123 Healthcare Street</p>
            <p>Medical City, MC 12345</p>
          </Card>

          <Card className="info-card">
            <Icons.Clock className="info-icon" />
            <h3>Business Hours</h3>
            <p>Monday - Friday: 9:00 AM - 6:00 PM</p>
            <p>Saturday: 10:00 AM - 4:00 PM</p>
          </Card>
        </div>

        <Card className="contact-form-card">
          <h2>Send us a Message</h2>
          {submitted && (
            <div className="success-message">
              <Icons.Success className="success-icon" />
              <span>Thank you! Your message has been sent successfully.</span>
            </div>
          )}
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label className="form-label">Name</label>
              <input
                type="text"
                className="form-input"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                required
              />
            </div>
            <div className="form-group">
              <label className="form-label">Email</label>
              <input
                type="email"
                className="form-input"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                required
              />
            </div>
            <div className="form-group">
              <label className="form-label">Subject</label>
              <input
                type="text"
                className="form-input"
                value={formData.subject}
                onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                required
              />
            </div>
            <div className="form-group">
              <label className="form-label">Message</label>
              <textarea
                className="form-textarea"
                rows={6}
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                required
              />
            </div>
            <Button type="submit" size="lg" className="submit-button">
              Send Message
            </Button>
          </form>
        </Card>
      </div>
    </div>
  );
};

