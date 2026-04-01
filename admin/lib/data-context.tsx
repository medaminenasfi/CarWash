'use client';

import React, { createContext, useContext, useState, useCallback } from 'react';
import { users as initialUsers, reservations as initialReservations, topCenters as initialCenters, carWashServices as initialServices } from './mock-data';

export interface User {
  id: string;
  name: string;
  email: string;
  type: 'Customer' | 'Center Owner' | 'Admin';
  status: 'Active' | 'Inactive';
  joinDate: string;
}

export interface Reservation {
  id: string;
  center: string;
  customer: string;
  date: string;
  time: string;
  service: string;
  status: 'Completed' | 'Pending' | 'Cancelled';
  amount: number;
}

export interface CarWashCenter {
  id: string;
  name: string;
  city: string;
  address?: string;
  phone?: string;
  lat?: number;
  lng?: number;
  reservations: number;
  rating: number;
}

export interface Service {
  id: string;
  name: string;
  price: number;
  duration: number;
  category: string;
}

interface DataContextType {
  users: User[];
  reservations: Reservation[];
  centers: CarWashCenter[];
  services: Service[];
  
  addUser: (user: Omit<User, 'id'>) => void;
  updateUser: (id: string, user: Partial<User>) => void;
  deleteUser: (id: string) => void;
  
  addReservation: (reservation: Omit<Reservation, 'id'>) => void;
  updateReservation: (id: string, reservation: Partial<Reservation>) => void;
  deleteReservation: (id: string) => void;
  
  addCenter: (center: Omit<CarWashCenter, 'id'>) => void;
  updateCenter: (id: string, center: Partial<CarWashCenter>) => void;
  deleteCenter: (id: string) => void;
  
  addService: (service: Omit<Service, 'id'>) => void;
  updateService: (id: string, service: Partial<Service>) => void;
  deleteService: (id: string) => void;
}

const DataContext = createContext<DataContextType | undefined>(undefined);

export function DataProvider({ children }: { children: React.ReactNode }) {
  const [users, setUsers] = useState<User[]>(initialUsers);
  const [reservations, setReservations] = useState<Reservation[]>(initialReservations);
  const [centers, setCenters] = useState<CarWashCenter[]>(
    initialCenters.map(c => ({
      ...c,
      address: `${c.city}, USA`,
      phone: `+1-${Math.floor(Math.random() * 9000000000 + 1000000000)}`,
      lat: Math.random() * (40.9 - 40.7) + 40.7,
      lng: Math.random() * (-73.9 + 74.0) - 74.0,
    }))
  );
  const [services, setServices] = useState<Service[]>(initialServices);

  // User operations
  const addUser = useCallback((user: Omit<User, 'id'>) => {
    const newUser: User = {
      ...user,
      id: `USER-${Date.now()}`,
    };
    setUsers(prev => [newUser, ...prev]);
  }, []);

  const updateUser = useCallback((id: string, updates: Partial<User>) => {
    setUsers(prev => prev.map(u => u.id === id ? { ...u, ...updates } : u));
  }, []);

  const deleteUser = useCallback((id: string) => {
    setUsers(prev => prev.filter(u => u.id !== id));
  }, []);

  // Reservation operations
  const addReservation = useCallback((reservation: Omit<Reservation, 'id'>) => {
    const newReservation: Reservation = {
      ...reservation,
      id: `RES-${String(reservations.length + 1).padStart(3, '0')}`,
    };
    setReservations(prev => [newReservation, ...prev]);
  }, [reservations.length]);

  const updateReservation = useCallback((id: string, updates: Partial<Reservation>) => {
    setReservations(prev => prev.map(r => r.id === id ? { ...r, ...updates } : r));
  }, []);

  const deleteReservation = useCallback((id: string) => {
    setReservations(prev => prev.filter(r => r.id !== id));
  }, []);

  // Center operations
  const addCenter = useCallback((center: Omit<CarWashCenter, 'id'>) => {
    const newCenter: CarWashCenter = {
      ...center,
      id: `CENTER-${Date.now()}`,
    };
    setCenters(prev => [newCenter, ...prev]);
  }, []);

  const updateCenter = useCallback((id: string, updates: Partial<CarWashCenter>) => {
    setCenters(prev => prev.map(c => c.id === id ? { ...c, ...updates } : c));
  }, []);

  const deleteCenter = useCallback((id: string) => {
    setCenters(prev => prev.filter(c => c.id !== id));
  }, []);

  // Service operations
  const addService = useCallback((service: Omit<Service, 'id'>) => {
    const newService: Service = {
      ...service,
      id: `SVC-${Date.now()}`,
    };
    setServices(prev => [newService, ...prev]);
  }, []);

  const updateService = useCallback((id: string, updates: Partial<Service>) => {
    setServices(prev => prev.map(s => s.id === id ? { ...s, ...updates } : s));
  }, []);

  const deleteService = useCallback((id: string) => {
    setServices(prev => prev.filter(s => s.id !== id));
  }, []);

  const value: DataContextType = {
    users,
    reservations,
    centers,
    services,
    addUser,
    updateUser,
    deleteUser,
    addReservation,
    updateReservation,
    deleteReservation,
    addCenter,
    updateCenter,
    deleteCenter,
    addService,
    updateService,
    deleteService,
  };

  return <DataContext.Provider value={value}>{children}</DataContext.Provider>;
}

export function useData() {
  const context = useContext(DataContext);
  if (context === undefined) {
    throw new Error('useData must be used within a DataProvider');
  }
  return context;
}
