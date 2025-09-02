
export type Category = 'residential' | 'commercial' | 'hospitality' | 'interiors';

export interface ProjectPhoto {
  url: string;
  caption: string;
}

export interface Project {
  _id: string;
  projectName: string;
  category: Category;
  sqft?: string;
  mainPhoto: string;
  location: string;
  description: string;
  descriptionPhotos: ProjectPhoto[];
  createdAt: string;
  updatedAt: string;
}
