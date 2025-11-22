import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Icons } from './Icons';
import './Navigation.css';

export const Navigation: React.FC = () => {
  const location = useLocation();

  const navItems = [
    { path: '/', label: 'Home', Icon: Icons.Home },
    { path: '/dashboard', label: 'Dashboard', Icon: Icons.Dashboard },
    { path: '/patients', label: 'Patients', Icon: Icons.Patient },
    { path: '/doctors', label: 'Doctors', Icon: Icons.Doctor },
    { path: '/caretakers', label: 'Caretakers', Icon: Icons.Caretaker },
    { path: '/medicines', label: 'Medicines', Icon: Icons.Medicine },
    { path: '/search', label: 'Search', Icon: Icons.Search },
    { path: '/about', label: 'About', Icon: Icons.About },
    { path: '/contact', label: 'Contact', Icon: Icons.Contact },
  ];

  return (
    <nav className="navigation">
      <div className="nav-brand">
        <Icons.Hospital className="brand-icon" />
        <h2>HMS</h2>
      </div>
      <ul className="nav-list">
        {navItems.map((item) => {
          const IconComponent = item.Icon;
          return (
            <li key={item.path}>
              <Link
                to={item.path}
                className={`nav-link ${location.pathname === item.path ? 'active' : ''}`}
              >
                <IconComponent className="nav-icon" />
                {item.label}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
};

