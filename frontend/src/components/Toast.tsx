import React, { useEffect } from 'react';
import { Icons } from './Icons';
import './Toast.css';

interface ToastProps {
  message: string;
  type: 'success' | 'error' | 'info';
  onClose: () => void;
  duration?: number;
}

export const Toast: React.FC<ToastProps> = ({ message, type, onClose, duration = 3000 }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, duration);

    return () => clearTimeout(timer);
  }, [duration, onClose]);

  const IconComponent = type === 'success' ? Icons.Success : type === 'error' ? Icons.Error : Icons.Info;

  return (
    <div className={`toast toast-${type}`}>
      <div className="toast-content">
        <IconComponent className="toast-icon" />
        <span className="toast-message">{message}</span>
        <button className="toast-close" onClick={onClose}>×</button>
      </div>
    </div>
  );
};

