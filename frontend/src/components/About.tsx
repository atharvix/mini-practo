import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from './Button';
import { Icons } from './Icons';
import './About.css';

export const About: React.FC = () => {
  return (
    <div className="about-container">
      <div className="about-hero">
        <h1>About Hospital Management System</h1>
        <p className="about-subtitle">Empowering healthcare with modern technology</p>
      </div>

      <section className="about-content">
        <div className="about-section">
          <h2>Our Mission</h2>
          <p>
            To provide healthcare institutions with a comprehensive, user-friendly platform
            that streamlines operations, improves patient care, and enhances overall efficiency.
            We believe that technology should make healthcare management simpler, not more complex.
          </p>
        </div>

        <div className="about-section">
          <h2>What We Offer</h2>
          <div className="offer-grid">
            <div className="offer-item">
              <div className="offer-icon">
                <Icons.Dashboard />
              </div>
              <h3>Efficient Management</h3>
              <p>Streamline all hospital operations in one centralized platform</p>
            </div>
            <div className="offer-item">
              <div className="offer-icon">
                <Icons.Hospital />
              </div>
              <h3>Secure & Reliable</h3>
              <p>Your data is safe with our robust security measures</p>
            </div>
            <div className="offer-item">
              <div className="offer-icon">
                <Icons.Flask />
              </div>
              <h3>Fast Performance</h3>
              <p>Built with modern technology for optimal speed and responsiveness</p>
            </div>
            <div className="offer-item">
              <div className="offer-icon">
                <Icons.Search />
              </div>
              <h3>Responsive Design</h3>
              <p>Access your system from any device, anywhere, anytime</p>
            </div>
          </div>
        </div>

        <div className="about-section">
          <h2>Key Capabilities</h2>
          <ul className="capabilities-list">
            <li>
              <strong>Patient Management:</strong> Complete patient records with unique identification,
              medical history, and treatment tracking
            </li>
            <li>
              <strong>Doctor Directory:</strong> Comprehensive doctor profiles with specializations,
              contact information, and availability
            </li>
            <li>
              <strong>Caretaker Management:</strong> Efficient scheduling and management of hospital
              caretakers and staff
            </li>
            <li>
              <strong>Medicine Inventory:</strong> Real-time stock tracking, automated alerts, and
              inventory management
            </li>
            <li>
              <strong>Universal Search:</strong> Quick search functionality across all entities using
              unique identification codes
            </li>
            <li>
              <strong>Analytics Dashboard:</strong> Real-time insights and statistics for informed
              decision-making
            </li>
          </ul>
        </div>

        <div className="about-section">
          <h2>Technology Stack</h2>
          <div className="tech-grid">
            <div className="tech-item">
              <div className="tech-name">React</div>
              <div className="tech-desc">Modern frontend framework</div>
            </div>
            <div className="tech-item">
              <div className="tech-name">TypeScript</div>
              <div className="tech-desc">Type-safe development</div>
            </div>
            <div className="tech-item">
              <div className="tech-name">Spring Boot</div>
              <div className="tech-desc">Robust backend framework</div>
            </div>
            <div className="tech-item">
              <div className="tech-name">MySQL</div>
              <div className="tech-desc">Reliable database system</div>
            </div>
          </div>
        </div>

        <div className="about-cta">
          <h2>Ready to Transform Your Hospital Management?</h2>
          <p>Get started today and experience the difference</p>
          <div className="about-buttons">
            <Link to="/dashboard">
              <Button size="lg">Go to Dashboard</Button>
            </Link>
            <Link to="/contact">
              <Button size="lg" variant="secondary">Contact Us</Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

