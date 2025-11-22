import React from 'react';
import { Link } from 'react-router-dom';
import { Icons } from './Icons';
import './Footer.css';

export const Footer: React.FC = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-section">
          <div className="footer-brand">
            <Icons.Hospital className="footer-brand-icon" />
            <h3>Hospital Management System</h3>
          </div>
          <p>Streamlining healthcare operations with modern technology</p>
          <div className="social-links">
            <a href="#" aria-label="Facebook"><Icons.Facebook /></a>
            <a href="#" aria-label="Twitter"><Icons.Twitter /></a>
            <a href="#" aria-label="LinkedIn"><Icons.LinkedIn /></a>
            <a href="#" aria-label="GitHub"><Icons.Github /></a>
          </div>
        </div>

        <div className="footer-section">
          <h4>Quick Links</h4>
          <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/dashboard">Dashboard</Link></li>
            <li><Link to="/about">About</Link></li>
            <li><Link to="/contact">Contact</Link></li>
          </ul>
        </div>

        <div className="footer-section">
          <h4>Features</h4>
          <ul>
            <li><Link to="/patients">Patients</Link></li>
            <li><Link to="/doctors">Doctors</Link></li>
            <li><Link to="/caretakers">Caretakers</Link></li>
            <li><Link to="/medicines">Medicines</Link></li>
          </ul>
        </div>

        <div className="footer-section">
          <h4>Support</h4>
          <ul>
            <li><Link to="/search">Search</Link></li>
            <li><a href="#">Documentation</a></li>
            <li><a href="#">Help Center</a></li>
            <li><a href="#">Privacy Policy</a></li>
          </ul>
        </div>
      </div>

      <div className="footer-bottom">
        <p>&copy; {new Date().getFullYear()} Hospital Management System. All rights reserved.</p>
      </div>
    </footer>
  );
};

