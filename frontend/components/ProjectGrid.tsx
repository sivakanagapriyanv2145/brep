
import React from 'react';
import type { Project } from '../types';
import ProjectCard from './ProjectCard';

interface ProjectGridProps {
  projects: Project[];
  onProjectClick: (project: Project) => void;
}

const ProjectGrid: React.FC<ProjectGridProps> = ({ projects, onProjectClick }) => {
  return (
    <div className="columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-6">
      {projects.map((project) => (
        <ProjectCard
          key={project._id}
          project={project}
          onClick={() => onProjectClick(project)}
        />
      ))}
    </div>
  );
};

export default ProjectGrid;
