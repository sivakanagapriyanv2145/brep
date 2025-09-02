import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ProjectForm } from '../components/ProjectForm';
import { getProject } from '../../services/projectAdminService';
import type { Project } from '../types';
import Spinner from '../components/ui/Spinner';
import { ArrowLeft } from 'lucide-react';

const AdminProjectFormPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const isEditMode = !!id;
  const [project, setProject] = useState<Project | undefined>(undefined);
  const [loading, setLoading] = useState(isEditMode);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (isEditMode && id) {
      getProject(id)
        .then(data => setProject(data))
        .catch(() => setError('Failed to load project data.'))
        .finally(() => setLoading(false));
    }
  }, [id, isEditMode]);

  const pageTitle = isEditMode ? 'Edit Project' : 'Create New Project';
  
  if (loading) {
    return <div className="flex justify-center items-center h-full"><Spinner /></div>;
  }

  if (error) {
    return <div className="text-red-500 text-center">{error}</div>;
  }

  if (isEditMode && !project) {
    return <div className="text-center">Project not found.</div>;
  }

  return (
    <div className="space-y-6">
       <div className="flex items-center gap-4">
        <Link to="/admin/projects" className="p-2 rounded-full hover:bg-gray-200">
            <ArrowLeft className="h-5 w-5" />
        </Link>
        <h1 className="text-3xl font-bold">{pageTitle}</h1>
      </div>
      <ProjectForm project={project} />
    </div>
  );
};

export default AdminProjectFormPage;
