import axios from 'axios';
import type { Patient, Doctor, Caretaker, Medicine } from '../types';

const API_BASE_URL = import.meta.env.VITE_API_URL || '/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000, // 10 seconds timeout
});

// Request interceptor
api.interceptors.request.use(
  (config: any) => {
    return config;
  },
  (error: any) => {
    return Promise.reject(error);
  }
);

// Response interceptor for error handling
api.interceptors.response.use(
  (response: any) => {
    return response;
  },
  (error: any) => {
    if (error.code === 'ECONNABORTED') {
      console.error('Request timeout - Backend may not be running');
    } else if (error.response) {
      // Server responded with error status
      console.error('API Error:', error.response.status, error.response.data);
    } else if (error.request) {
      // Request made but no response received
      console.error('No response from backend - Is the server running on port 8080?');
    } else {
      console.error('Error:', error.message);
    }
    return Promise.reject(error);
  }
);

// Patient API
export const patientApi = {
  getAll: () => api.get<Patient[]>('/patients'),
  getByUid: (uid: string) => api.get<Patient>(`/patients/${uid}`),
  create: (patient: Omit<Patient, 'id' | 'uid'> & { uid?: string }) => api.post<Patient>('/patients', patient),
  delete: (id: number) => api.delete(`/patients/${id}`),
};

// Doctor API
export const doctorApi = {
  getAll: () => api.get<Doctor[]>('/doctors'),
  getByUid: (uid: string) => api.get<Doctor>(`/doctors/${uid}`),
  create: (doctor: Omit<Doctor, 'id' | 'uid'> & { uid?: string }) => api.post<Doctor>('/doctors', doctor),
  delete: (id: number) => api.delete(`/doctors/${id}`),
};

// Caretaker API
export const caretakerApi = {
  getAll: () => api.get<Caretaker[]>('/caretakers'),
  getByUid: (uid: string) => api.get<Caretaker>(`/caretakers/${uid}`),
  create: (caretaker: Omit<Caretaker, 'id' | 'uid'> & { uid?: string }) => api.post<Caretaker>('/caretakers', caretaker),
  delete: (id: number) => api.delete(`/caretakers/${id}`),
};

// Medicine API
export const medicineApi = {
  getAll: () => api.get<Medicine[]>('/medicines'),
  getByUid: (uid: string) => api.get<Medicine>(`/medicines/${uid}`),
  create: (medicine: Omit<Medicine, 'id' | 'uid'> & { uid?: string }) => api.post<Medicine>('/medicines', medicine),
  updateStock: (uid: string, newStock: number) => api.put<Medicine>(`/medicines/${uid}/stock/${newStock}`),
  delete: (id: number) => api.delete(`/medicines/${id}`),
};

// Search API
export const searchApi = {
  searchByUid: (uid: string) => api.get(`/search/${uid}`),
};

