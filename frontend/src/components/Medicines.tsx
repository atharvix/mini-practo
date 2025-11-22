import React, { useState, useEffect } from 'react';
import { medicineApi } from '../services/api';
import type { Medicine } from '../types';
import { Card } from './Card';
import { Button } from './Button';
import './Patients.css';
import './Form.css';

export const Medicines: React.FC = () => {
  const [medicines, setMedicines] = useState<Medicine[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState<Omit<Medicine, 'id' | 'uid'>>({
    medicineName: '',
    description: '',
    stock: 0,
  });
  const [error, setError] = useState<string>('');
  const [stockUpdateUid, setStockUpdateUid] = useState<string>('');
  const [newStock, setNewStock] = useState<number>(0);

  useEffect(() => {
    fetchMedicines();
  }, []);

  const fetchMedicines = async () => {
    try {
      setLoading(true);
      const response = await medicineApi.getAll();
      setMedicines(response.data);
      setError('');
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to fetch medicines');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    try {
      await medicineApi.create(formData);
      setFormData({ medicineName: '', description: '', stock: 0 });
      setShowForm(false);
      fetchMedicines();
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to create medicine');
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm('Are you sure you want to delete this medicine?')) return;

    try {
      await medicineApi.delete(id);
      fetchMedicines();
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to delete medicine');
    }
  };

  const handleStockUpdate = async (uid: string) => {
    if (newStock < 0) {
      setError('Stock cannot be negative');
      return;
    }

    try {
      await medicineApi.updateStock(uid, newStock);
      setStockUpdateUid('');
      setNewStock(0);
      fetchMedicines();
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to update stock');
    }
  };

  if (loading) {
    return <div className="loading">Loading medicines...</div>;
  }

  return (
    <div className="entity-container">
      <div className="entity-header">
        <h1>Medicines</h1>
        <Button onClick={() => setShowForm(!showForm)}>
          {showForm ? 'Cancel' : 'Add Medicine'}
        </Button>
      </div>

      {error && <div className="error-message">{error}</div>}

      {showForm && (
        <Card className="form-card">
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label className="form-label">Medicine Name</label>
              <input
                type="text"
                className="form-input"
                value={formData.medicineName}
                onChange={(e) => setFormData({ ...formData, medicineName: e.target.value })}
                required
              />
            </div>
            <div className="form-group">
              <label className="form-label">Description</label>
              <textarea
                className="form-textarea"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                required
              />
            </div>
            <div className="form-group">
              <label className="form-label">Initial Stock</label>
              <input
                type="number"
                className="form-input"
                value={formData.stock || ''}
                onChange={(e) => setFormData({ ...formData, stock: parseInt(e.target.value) || 0 })}
                required
                min="0"
              />
            </div>
            <Button type="submit">Create Medicine</Button>
          </form>
        </Card>
      )}

      <div className="entity-grid">
        {medicines.map((medicine) => (
          <Card key={medicine.id} className="entity-card">
            <div className="entity-card-header">
              <h3>{medicine.medicineName}</h3>
              <span className="entity-uid">{medicine.uid}</span>
            </div>
            <div className="entity-details">
              <p><strong>Description:</strong> {medicine.description}</p>
              <p><strong>Stock:</strong> {medicine.stock}</p>
            </div>
            <div style={{ display: 'flex', gap: '0.5rem', marginTop: '1rem' }}>
              {stockUpdateUid === medicine.uid ? (
                <div style={{ display: 'flex', gap: '0.5rem', width: '100%' }}>
                  <input
                    type="number"
                    className="form-input"
                    value={newStock}
                    onChange={(e) => setNewStock(parseInt(e.target.value) || 0)}
                    placeholder="New stock"
                    min="0"
                    style={{ flex: 1 }}
                  />
                  <Button size="sm" onClick={() => handleStockUpdate(medicine.uid)}>
                    Save
                  </Button>
                  <Button size="sm" variant="secondary" onClick={() => {
                    setStockUpdateUid('');
                    setNewStock(0);
                  }}>
                    Cancel
                  </Button>
                </div>
              ) : (
                <>
                  <Button
                    size="sm"
                    variant="success"
                    onClick={() => {
                      setStockUpdateUid(medicine.uid);
                      setNewStock(medicine.stock);
                    }}
                  >
                    Update Stock
                  </Button>
                  <Button
                    variant="danger"
                    size="sm"
                    onClick={() => handleDelete(medicine.id!)}
                  >
                    Delete
                  </Button>
                </>
              )}
            </div>
          </Card>
        ))}
      </div>

      {medicines.length === 0 && !loading && (
        <div className="empty-state">No medicines found</div>
      )}
    </div>
  );
};

