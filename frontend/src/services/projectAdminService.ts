import apiClient from './apiClient';
import type { Project } from '../admin/types';

export const listProjects = async (): Promise<Project[]> => {
  return apiClient.get('/projects');
};

export const getProject = async (id: string): Promise<Project> => {
  return apiClient.get(`/projects/${id}`);
};

export const createProject = async (formData: FormData): Promise<Project> => {
  return apiClient.post('/projects', formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });
};

export const updateProject = async (id: string, formData: FormData): Promise<Project> => {
  // Axios does not support PUT with multipart/form-data well in all cases.
  // A common workaround is to use POST and add a method override field if needed,
  // but most modern servers handle PUT correctly. If issues arise, this is a place to check.
  return apiClient.put(`/projects/${id}`, formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });
};

export const deleteProject = async (id: string): Promise<{ message: string }> => {
  return apiClient.delete(`/projects/${id}`);
};
