import React, { useState, useEffect } from 'react';
import { caretakerApi } from '../services/api';
import type { Caretaker } from '../types';
import { Card } from './Card';
import { Button } from './Button';
import './Patients.css';
import './Form.css';

export const Caretakers: React.FC = () => {
  const [caretakers, setCaretakers] = useState<Caretaker[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState<Omit<Caretaker, 'id' | 'uid'>>({
    name: '',
    shift: '',
  });
  const [error, setError] = useState<string>('');

  useEffect(() => {
    fetchCaretakers();
  }, []);

  const fetchCaretakers = async () => {
    try {
      setLoading(true);
      const response = await caretakerApi.getAll();
      setCaretakers(response.data);
      setError('');
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to fetch caretakers');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    try {
      await caretakerApi.create(formData);
      setFormData({ name: '', shift: '' });
      setShowForm(false);
      fetchCaretakers();
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to create caretaker');
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm('Are you sure you want to delete this caretaker?')) return;

    try {
      await caretakerApi.delete(id);
      fetchCaretakers();
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to delete caretaker');
    }
  };

  if (loading) {
    return <div className="loading">Loading caretakers...</div>;
  }

  return (
    <div className="entity-container">
      <div className="entity-header">
        <h1>Caretakers</h1>
        <Button onClick={() => setShowForm(!showForm)}>
          {showForm ? 'Cancel' : 'Add Caretaker'}
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
              <label className="form-label">Shift</label>
              <input
                type="text"
                className="form-input"
                value={formData.shift}
                onChange={(e) => setFormData({ ...formData, shift: e.target.value })}
                placeholder="e.g., Morning, Evening, Night"
                required
              />
            </div>
            <Button type="submit">Create Caretaker</Button>
          </form>
        </Card>
      )}

      <div className="entity-grid">
        {caretakers.map((caretaker) => (
          <Card key={caretaker.id} className="entity-card">
            <div className="entity-card-header">
              <h3>{caretaker.name}</h3>
              <span className="entity-uid">{caretaker.uid}</span>
            </div>
            <div className="entity-details">
              <p><strong>Shift:</strong> {caretaker.shift}</p>
            </div>
            <Button
              variant="danger"
              size="sm"
              onClick={() => handleDelete(caretaker.id!)}
            >
              Delete
            </Button>
          </Card>
        ))}
      </div>

      {caretakers.length === 0 && !loading && (
        <div className="empty-state">No caretakers found</div>
      )}
    </div>
  );
};

