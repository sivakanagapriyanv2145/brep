import apiClient from './apiClient';
import type { Admin } from '../admin/types';

export const login = async (email: string, password: string): Promise<{ token: string; admin: Admin }> => {
  return apiClient.post('/auth/login', { email, password });
};

export const verifyToken = async (): Promise<Admin> => {
  return apiClient.get('/auth/verify');
};
