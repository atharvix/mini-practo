import React from 'react';
import './LoadingSkeleton.css';

export const LoadingSkeleton: React.FC = () => {
  return (
    <div className="skeleton-container">
      {[1, 2, 3, 4, 5, 6].map((i) => (
        <div key={i} className="skeleton-card">
          <div className="skeleton-header">
            <div className="skeleton-line skeleton-title"></div>
            <div className="skeleton-line skeleton-badge"></div>
          </div>
          <div className="skeleton-content">
            <div className="skeleton-line"></div>
            <div className="skeleton-line"></div>
            <div className="skeleton-line skeleton-short"></div>
          </div>
          <div className="skeleton-footer">
            <div className="skeleton-button"></div>
          </div>
        </div>
      ))}
    </div>
  );
};

