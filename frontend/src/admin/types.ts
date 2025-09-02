export interface Admin {
  _id: string;
  name: string;
  email: string;
  phoneNumber?: string;
  location?: string;
  role: 'admin' | 'super_admin';
  avatar?: string;
  isActive: boolean;
  createdAt: string;
}

export type ProjectCategory = 'home' | 'commercial' | 'hospitality' | 'interiors';

export interface ProjectPhoto {
  url: string;
  caption: string;
  _id?: string; // from server
}

export interface Project {
  _id: string;
  projectName: string;
  category: ProjectCategory;
  sqft?: string;
  location: string;
  mainPhoto: string;
  description: string;
  descriptionPhotos: ProjectPhoto[];
  createdAt: string;
  updatedAt: string;
}

// For file uploads with previews and metadata
export interface UploadableFile {
  file: File;
  preview: string;
  caption: string;
  id: string; // for key
}
