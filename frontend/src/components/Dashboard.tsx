import React, { useState, useEffect } from 'react';
import { patientApi, doctorApi, caretakerApi, medicineApi } from '../services/api';
import { Card } from './Card';
import { Icons } from './Icons';
import './Dashboard.css';

export const Dashboard: React.FC = () => {
  const [stats, setStats] = useState({
    patients: 0,
    doctors: 0,
    caretakers: 0,
    medicines: 0,
    loading: true,
  });

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const [patientsRes, doctorsRes, caretakersRes, medicinesRes] = await Promise.all([
        patientApi.getAll(),
        doctorApi.getAll(),
        caretakerApi.getAll(),
        medicineApi.getAll(),
      ]);

      setStats({
        patients: patientsRes.data.length,
        doctors: doctorsRes.data.length,
        caretakers: caretakersRes.data.length,
        medicines: medicinesRes.data.length,
        loading: false,
      });
    } catch (err) {
      console.error('Failed to fetch stats:', err);
      setStats((prev) => ({ ...prev, loading: false }));
    }
  };

  if (stats.loading) {
    return <div className="loading">Loading dashboard...</div>;
  }

  return (
    <div className="dashboard-container">
      <div className="dashboard-header">
        <Icons.Dashboard className="dashboard-header-icon" />
        <div>
          <h1>Dashboard</h1>
          <p className="dashboard-subtitle">Hospital Management System Overview</p>
        </div>
      </div>

      <div className="stats-grid">
        <Card className="stat-card stat-patients">
          <Icons.Patient className="stat-icon" />
          <div className="stat-content">
            <h3>Patients</h3>
            <p className="stat-number">{stats.patients}</p>
          </div>
        </Card>

        <Card className="stat-card stat-doctors">
          <Icons.Doctor className="stat-icon" />
          <div className="stat-content">
            <h3>Doctors</h3>
            <p className="stat-number">{stats.doctors}</p>
          </div>
        </Card>

        <Card className="stat-card stat-caretakers">
          <Icons.Caretaker className="stat-icon" />
          <div className="stat-content">
            <h3>Caretakers</h3>
            <p className="stat-number">{stats.caretakers}</p>
          </div>
        </Card>

        <Card className="stat-card stat-medicines">
          <Icons.Medicine className="stat-icon" />
          <div className="stat-content">
            <h3>Medicines</h3>
            <p className="stat-number">{stats.medicines}</p>
          </div>
        </Card>
      </div>
    </div>
  );
};

