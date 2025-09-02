import apiClient from './apiClient';
import type { Admin } from '../admin/types';

export const listAdmins = async (): Promise<Admin[]> => {
  return apiClient.get('/admins');
};

export const getAdmin = async (id: string): Promise<Admin> => {
  return apiClient.get(`/admins/${id}`);
};

export const createAdmin = async (adminData: Partial<Admin>): Promise<Admin> => {
  return apiClient.post('/admins', adminData);
};

export const updateAdminProfile = async (adminData: Partial<Admin>): Promise<Admin> => {
    return apiClient.put('/admins/profile', adminData);
};

export const updateAdmin = async (id: string, adminData: Partial<Admin>): Promise<Admin> => {
  return apiClient.put(`/admins/${id}`, adminData);
};

export const deleteAdmin = async (id: string): Promise<{ message: string }> => {
  return apiClient.delete(`/admins/${id}`);
};
