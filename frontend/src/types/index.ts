export interface Patient {
  id?: number;
  uid: string;
  name: string;
  age: number;
  disease: string;
}

export interface Doctor {
  id?: number;
  uid: string;
  name: string;
  specialization: string;
  phone: string;
}

export interface Caretaker {
  id?: number;
  uid: string;
  name: string;
  shift: string;
}

export interface Medicine {
  id?: number;
  uid: string;
  medicineName: string;
  description: string;
  stock: number;
}

export type EntityType = Patient | Doctor | Caretaker | Medicine;

