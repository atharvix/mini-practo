import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from './Button';
import { Icons } from './Icons';
import './Home.css';

export const Home: React.FC = () => {
  return (
    <div className="home-container">
      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-content">
          <div className="hero-badge">
            <Icons.Hospital />
            Hospital Management System
          </div>
          <h1 className="hero-title">
            Streamline Your Hospital
            <span className="gradient-text"> Operations</span>
          </h1>
          <p className="hero-description">
            A comprehensive solution for managing patients, doctors, caretakers, and medicines.
            Built with modern technology to provide seamless healthcare management.
          </p>
          <div className="hero-buttons">
            <Link to="/dashboard">
              <Button size="lg" className="hero-btn-primary">
                Get Started
              </Button>
            </Link>
            <Link to="/about">
              <Button size="lg" variant="secondary" className="hero-btn-secondary">
                Learn More
              </Button>
            </Link>
          </div>
        </div>
        <div className="hero-visual">
          <img 
            src="https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?w=600&h=400&fit=crop" 
            alt="Modern hospital facility"
            className="hero-image"
          />
          <div className="floating-card card-1">
            <Icons.Patient className="card-icon" />
            <div className="card-text">Patients</div>
          </div>
          <div className="floating-card card-2">
            <Icons.Doctor className="card-icon" />
            <div className="card-text">Doctors</div>
          </div>
          <div className="floating-card card-3">
            <Icons.Medicine className="card-icon" />
            <div className="card-text">Medicines</div>
          </div>
          <div className="floating-card card-4">
            <Icons.Caretaker className="card-icon" />
            <div className="card-text">Caretakers</div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="features-section">
        <h2 className="section-title">Key Features</h2>
        <div className="features-grid">
          <div className="feature-card">
            <div className="feature-icon">
              <Icons.Dashboard />
            </div>
            <h3>Dashboard Analytics</h3>
            <p>Real-time overview of all hospital operations and statistics</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">
              <Icons.Users />
            </div>
            <h3>Patient Management</h3>
            <p>Comprehensive patient records with unique identification system</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">
              <Icons.Stethoscope />
            </div>
            <h3>Doctor Directory</h3>
            <p>Manage doctor profiles, specializations, and contact information</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">
              <Icons.Medicine />
            </div>
            <h3>Medicine Inventory</h3>
            <p>Track medicine stock levels and manage pharmacy inventory</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">
              <Icons.Search />
            </div>
            <h3>Smart Search</h3>
            <p>Quick search across all entities using unique identification codes</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">
              <Icons.Flask />
            </div>
            <h3>Fast & Reliable</h3>
            <p>Built with modern technology for optimal performance</p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section">
        <div className="cta-content">
          <h2>Ready to Get Started?</h2>
          <p>Start managing your hospital operations efficiently today</p>
          <Link to="/dashboard">
            <Button size="lg" className="cta-button">
              Go to Dashboard
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
};

