import React, { useState, useEffect } from 'react';
import { patientApi } from '../services/api';
import type { Patient } from '../types';
import { Card } from './Card';
import { Button } from './Button';
import { LoadingSkeleton } from './LoadingSkeleton';
import { useToast } from '../hooks/useToast';
import './Patients.css';
import './Form.css';

export const Patients: React.FC = () => {
  const [patients, setPatients] = useState<Patient[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState<Omit<Patient, 'id' | 'uid'>>({
    name: '',
    age: 0,
    disease: '',
  });
  const [error, setError] = useState<string>('');
  const { showToast, ToastContainer } = useToast();

  useEffect(() => {
    fetchPatients();
  }, []);

  const fetchPatients = async () => {
    try {
      setLoading(true);
      const response = await patientApi.getAll();
      setPatients(response.data);
      setError('');
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to fetch patients');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    try {
      await patientApi.create(formData);
      setFormData({ name: '', age: 0, disease: '' });
      setShowForm(false);
      showToast('Patient created successfully!', 'success');
      fetchPatients();
    } catch (err: any) {
      const errorMsg = err.response?.data?.message || 'Failed to create patient';
      setError(errorMsg);
      showToast(errorMsg, 'error');
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm('Are you sure you want to delete this patient?')) return;

    try {
      await patientApi.delete(id);
      showToast('Patient deleted successfully!', 'success');
      fetchPatients();
    } catch (err: any) {
      const errorMsg = err.response?.data?.message || 'Failed to delete patient';
      setError(errorMsg);
      showToast(errorMsg, 'error');
    }
  };

  return (
    <div className="entity-container">
      <ToastContainer />
      <div className="entity-header">
        <h1>Patients</h1>
        <Button onClick={() => setShowForm(!showForm)}>
          {showForm ? 'Cancel' : 'Add Patient'}
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
              <label className="form-label">Age</label>
              <input
                type="number"
                className="form-input"
                value={formData.age || ''}
                onChange={(e) => setFormData({ ...formData, age: parseInt(e.target.value) || 0 })}
                required
                min="0"
              />
            </div>
            <div className="form-group">
              <label className="form-label">Disease</label>
              <input
                type="text"
                className="form-input"
                value={formData.disease}
                onChange={(e) => setFormData({ ...formData, disease: e.target.value })}
                required
              />
            </div>
            <Button type="submit">Create Patient</Button>
          </form>
        </Card>
      )}

      <div className="entity-grid">
        {patients.map((patient) => (
          <Card key={patient.id} className="entity-card">
            <div className="entity-card-header">
              <h3>{patient.name}</h3>
              <span className="entity-uid">{patient.uid}</span>
            </div>
            <div className="entity-details">
              <p><strong>Age:</strong> {patient.age}</p>
              <p><strong>Disease:</strong> {patient.disease}</p>
            </div>
            <Button
              variant="danger"
              size="sm"
              onClick={() => handleDelete(patient.id!)}
            >
              Delete
            </Button>
          </Card>
        ))}
      </div>

      {loading ? (
        <LoadingSkeleton />
      ) : patients.length === 0 ? (
        <div className="empty-state">
          <div className="empty-icon">👤</div>
          <h3>No patients found</h3>
          <p>Get started by adding your first patient</p>
        </div>
      ) : null}
    </div>
  );
};

