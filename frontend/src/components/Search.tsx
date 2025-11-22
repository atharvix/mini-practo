import React, { useState } from 'react';
import { searchApi } from '../services/api';
import type { Patient, Doctor, Caretaker, Medicine } from '../types';
import { Card } from './Card';
import { Button } from './Button';
import { Icons } from './Icons';
import './Search.css';
import './Form.css';

type SearchResult = Patient | Doctor | Caretaker | Medicine;

export const Search: React.FC = () => {
  const [uid, setUid] = useState('');
  const [result, setResult] = useState<SearchResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string>('');

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setResult(null);

    if (!uid.trim()) {
      setError('Please enter a UID');
      return;
    }

    try {
      setLoading(true);
      const response = await searchApi.searchByUid(uid.trim().toUpperCase());
      
      if (typeof response.data === 'string') {
        setError(response.data);
      } else {
        setResult(response.data);
      }
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to search. Invalid UID format or not found.');
    } finally {
      setLoading(false);
    }
  };

  const getEntityType = (result: SearchResult): string => {
    if ('disease' in result) return 'Patient';
    if ('specialization' in result) return 'Doctor';
    if ('shift' in result) return 'Caretaker';
    if ('medicineName' in result) return 'Medicine';
    return 'Unknown';
  };

  const getEntityIcon = (type: string) => {
    switch (type) {
      case 'Patient': return Icons.Patient;
      case 'Doctor': return Icons.Doctor;
      case 'Caretaker': return Icons.Caretaker;
      case 'Medicine': return Icons.Medicine;
      default: return Icons.Search;
    }
  };

  const renderResult = () => {
    if (!result) return null;

    const entityType = getEntityType(result);
    const IconComponent = getEntityIcon(entityType);

    return (
      <Card className="search-result">
        <div className="search-result-header">
          <div className="result-type">
            <IconComponent className="result-icon" />
            <h3>{entityType}</h3>
          </div>
          <span className="entity-uid">{result.uid}</span>
        </div>
        <div className="search-result-details">
          {entityType === 'Patient' && (
            <div className="detail-grid">
              <div className="detail-item">
                <span className="detail-label">Name</span>
                <span className="detail-value">{(result as Patient).name}</span>
              </div>
              <div className="detail-item">
                <span className="detail-label">Age</span>
                <span className="detail-value">{(result as Patient).age} years</span>
              </div>
              <div className="detail-item full-width">
                <span className="detail-label">Disease</span>
                <span className="detail-value">{(result as Patient).disease}</span>
              </div>
            </div>
          )}
          {entityType === 'Doctor' && (
            <div className="detail-grid">
              <div className="detail-item">
                <span className="detail-label">Name</span>
                <span className="detail-value">{(result as Doctor).name}</span>
              </div>
              <div className="detail-item">
                <span className="detail-label">Specialization</span>
                <span className="detail-value">{(result as Doctor).specialization}</span>
              </div>
              <div className="detail-item full-width">
                <span className="detail-label">Phone</span>
                <span className="detail-value">{(result as Doctor).phone}</span>
              </div>
            </div>
          )}
          {entityType === 'Caretaker' && (
            <div className="detail-grid">
              <div className="detail-item">
                <span className="detail-label">Name</span>
                <span className="detail-value">{(result as Caretaker).name}</span>
              </div>
              <div className="detail-item">
                <span className="detail-label">Shift</span>
                <span className="detail-value">{(result as Caretaker).shift}</span>
              </div>
            </div>
          )}
          {entityType === 'Medicine' && (
            <div className="detail-grid">
              <div className="detail-item">
                <span className="detail-label">Name</span>
                <span className="detail-value">{(result as Medicine).medicineName}</span>
              </div>
              <div className="detail-item">
                <span className="detail-label">Stock</span>
                <span className={`detail-value stock-${(result as Medicine).stock > 10 ? 'high' : (result as Medicine).stock > 0 ? 'medium' : 'low'}`}>
                  {(result as Medicine).stock} units
                </span>
              </div>
              <div className="detail-item full-width">
                <span className="detail-label">Description</span>
                <span className="detail-value">{(result as Medicine).description}</span>
              </div>
            </div>
          )}
        </div>
      </Card>
    );
  };

  return (
    <div className="search-container">
      <div className="search-header">
        <div className="search-header-icon">
          <Icons.Search />
        </div>
        <h1>Search Hospital Records</h1>
        <p className="search-subtitle">
          Find patients, doctors, caretakers, or medicines using their unique identification code
        </p>
      </div>

      <Card className="search-form-card">
        <form onSubmit={handleSearch} className="search-form">
          <div className="form-group">
            <label className="form-label">
              <Icons.Search className="label-icon" />
              Enter UID
            </label>
            <div className="input-wrapper">
              <input
                type="text"
                className="form-input search-input"
                value={uid}
                onChange={(e) => setUid(e.target.value.toUpperCase())}
                placeholder="e.g., DOC1234, PAT5678, CT9012, PH3456"
                required
                disabled={loading}
              />
            </div>
            <div className="uid-examples">
              <span className="example-tag">DOC####</span>
              <span className="example-tag">PAT####</span>
              <span className="example-tag">CT####</span>
              <span className="example-tag">PH####</span>
            </div>
          </div>
          <Button type="submit" disabled={loading} size="lg" className="search-button">
            {loading ? (
              <>
                <span className="spinner"></span>
                Searching...
              </>
            ) : (
              <>
                <Icons.Search />
                Search
              </>
            )}
          </Button>
        </form>
      </Card>

      {error && (
        <Card className="error-card">
          <Icons.Error className="error-icon" />
          <div className="error-content">
            <h3>Search Failed</h3>
            <p>{error}</p>
          </div>
        </Card>
      )}

      {result && renderResult()}

      {!result && !error && !loading && (
        <div className="search-placeholder">
          <Icons.Search className="placeholder-icon" />
          <h3>Start Your Search</h3>
          <p>Enter a UID above to find records in the hospital database</p>
        </div>
      )}
    </div>
  );
};
