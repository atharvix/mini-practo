import React, { useState, useEffect } from 'react';
import { doctorApi } from '../services/api';
import type { Doctor } from '../types';
import { Card } from './Card';
import { Button } from './Button';
import './Patients.css';
import './Form.css';

export const Doctors: React.FC = () => {
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState<Omit<Doctor, 'id' | 'uid'>>({
    name: '',
    specialization: '',
    phone: '',
  });
  const [error, setError] = useState<string>('');

  useEffect(() => {
    fetchDoctors();
  }, []);

  const fetchDoctors = async () => {
    try {
      setLoading(true);
      const response = await doctorApi.getAll();
      setDoctors(response.data);
      setError('');
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to fetch doctors');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    try {
      await doctorApi.create(formData);
      setFormData({ name: '', specialization: '', phone: '' });
      setShowForm(false);
      fetchDoctors();
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to create doctor');
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm('Are you sure you want to delete this doctor?')) return;

    try {
      await doctorApi.delete(id);
      fetchDoctors();
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to delete doctor');
    }
  };

  if (loading) {
    return <div className="loading">Loading doctors...</div>;
  }

  return (
    <div className="entity-container">
      <div className="entity-header">
        <h1>Doctors</h1>
        <Button onClick={() => setShowForm(!showForm)}>
          {showForm ? 'Cancel' : 'Add Doctor'}
        </Button>
      </div>

      {error && <div className="error-message">{error}</div>}

      {showForm && (
        <Card className="form-card">
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
              <label className="form-label">Specialization</label>
              <input
                type="text"
                className="form-input"
                value={formData.specialization}
                onChange={(e) => setFormData({ ...formData, specialization: e.target.value })}
                required
              />
            </div>
            <div className="form-group">
              <label className="form-label">Phone</label>
              <input
                type="tel"
                className="form-input"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                required
              />
            </div>
            <Button type="submit">Create Doctor</Button>
          </form>
        </Card>
      )}

      <div className="entity-grid">
        {doctors.map((doctor) => (
          <Card key={doctor.id} className="entity-card">
            <div className="entity-card-header">
              <h3>{doctor.name}</h3>
              <span className="entity-uid">{doctor.uid}</span>
            </div>
            <div className="entity-details">
              <p><strong>Specialization:</strong> {doctor.specialization}</p>
              <p><strong>Phone:</strong> {doctor.phone}</p>
            </div>
            <Button
              variant="danger"
              size="sm"
              onClick={() => handleDelete(doctor.id!)}
            >
              Delete
            </Button>
          </Card>
        ))}
      </div>

      {doctors.length === 0 && !loading && (
        <div className="empty-state">No doctors found</div>
      )}
    </div>
  );
};

