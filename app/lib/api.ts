const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';
const API_BASE = API_URL.replace(/\/api\/?$/, '') || 'http://localhost:5000';

/** Resolve image path to full URL. Uploaded images (/uploads/...) use API base; /projects etc. stay as-is. */
export function imageUrl(path: string | undefined | null): string {
  if (!path || path.trim() === '') {
    return '';
  }
  
  // Already a full URL
  if (path.startsWith('http://') || path.startsWith('https://')) {
    return path;
  }
  
  // Backend uploaded images - always prepend API_BASE
  if (path.startsWith('/uploads/') || path.startsWith('/uploads')) {
    return `${API_BASE}${path}`;
  }
  
  // Handle paths that start with 'uploads/' (without leading slash)
  if (path.startsWith('uploads/')) {
    return `${API_BASE}/${path}`;
  }
  
  // If path doesn't start with /, it might be a relative backend path
  // Only treat it as backend path if it doesn't look like a public asset
  if (!path.startsWith('/')) {
    // Check if it's likely a filename (has extension)
    const hasExtension = /\.(jpg|jpeg|png|gif|webp|svg|bmp)$/i.test(path);
    if (hasExtension) {
      // Likely a backend-uploaded file - prepend API_BASE/uploads
      return `${API_BASE}/uploads/${path}`;
    }
  }
  
  // Public assets (like /projects/...) stay as-is
  return path;
}

export interface Production {
  _id: string;
  title: string;
  category: string;
  year: string;
  image: string;
  awards?: string;
  description: string;
  duration?: string;
  genre?: string;
  status?: string;
  featured?: boolean;
  order?: number;
}

export interface Course {
  _id: string;
  title: string;
  level: string;
  duration: string;
  students: string;
  rating: string;
  price: string;
  image: string;
  description: string;
  modules: string[];
  academy: string;
  featured?: boolean;
  order?: number;
}

export interface GalleryItem {
  _id: string;
  title: string;
  category: string;
  type: 'photo' | 'video';
  image: string;
  thumbnail?: string;
  videoUrl?: string;
  duration?: string;
  featured?: boolean;
  order?: number;
}

export interface Celebrity {
  _id: string;
  name: string;
  image: string;
  role: string;
  gallery: string[];
  bio?: string;
  featured?: boolean;
  order?: number;
}

export interface Testimonial {
  _id: string;
  name: string;
  course: string;
  image: string;
  text: string;
  rating: number;
  featured?: boolean;
  order?: number;
}

export interface Award {
  _id: string;
  title: string;
  year: string;
  category: string;
  project: string;
  image: string;
  description?: string;
  featured?: boolean;
  order?: number;
}

export interface Stat {
  _id: string;
  number: string;
  label: string;
  icon?: string;
  order?: number;
}

export interface TopProject {
  _id: string;
  title: string;
  category: string;
  image: string;
  description?: string;
  productionId?: string;
  order?: number;
  featured?: boolean;
}


// API Functions
export async function getProductions(category?: string, featured?: boolean): Promise<Production[]> {
  try {
    const params = new URLSearchParams();
    if (category) params.append('category', category);
    if (featured) params.append('featured', 'true');
    
    const response = await fetch(`${API_URL}/productions?${params.toString()}`);
    const data = await response.json();
    return data.success ? data.data : [];
  } catch (error) {
    console.error('Error fetching productions:', error);
    return [];
  }
}

export async function getCourses(academy?: string, featured?: boolean): Promise<Course[]> {
  try {
    const params = new URLSearchParams();
    if (academy) params.append('academy', academy);
    if (featured) params.append('featured', 'true');
    
    const response = await fetch(`${API_URL}/courses?${params.toString()}`);
    const data = await response.json();
    return data.success ? data.data : [];
  } catch (error) {
    console.error('Error fetching courses:', error);
    return [];
  }
}

export async function getGallery(type?: 'photo' | 'video', category?: string): Promise<GalleryItem[]> {
  try {
    const params = new URLSearchParams();
    if (type) params.append('type', type);
    if (category) params.append('category', category);
    
    const response = await fetch(`${API_URL}/gallery?${params.toString()}`);
    const data = await response.json();
    return data.success ? data.data : [];
  } catch (error) {
    console.error('Error fetching gallery:', error);
    return [];
  }
}

export async function getCelebrities(featured?: boolean): Promise<Celebrity[]> {
  try {
    const params = new URLSearchParams();
    if (featured) params.append('featured', 'true');
    
    const response = await fetch(`${API_URL}/celebrities?${params.toString()}`);
    const data = await response.json();
    return data.success ? data.data : [];
  } catch (error) {
    console.error('Error fetching celebrities:', error);
    return [];
  }
}

export async function getTestimonials(featured?: boolean): Promise<Testimonial[]> {
  try {
    const params = new URLSearchParams();
    if (featured) params.append('featured', 'true');
    
    const response = await fetch(`${API_URL}/testimonials?${params.toString()}`);
    const data = await response.json();
    return data.success ? data.data : [];
  } catch (error) {
    console.error('Error fetching testimonials:', error);
    return [];
  }
}

export async function getAwards(featured?: boolean): Promise<Award[]> {
  try {
    const params = new URLSearchParams();
    if (featured) params.append('featured', 'true');
    
    const response = await fetch(`${API_URL}/awards?${params.toString()}`);
    const data = await response.json();
    return data.success ? data.data : [];
  } catch (error) {
    console.error('Error fetching awards:', error);
    return [];
  }
}

export async function getStats(): Promise<Stat[]> {
  try {
    const response = await fetch(`${API_URL}/stats`);
    const data = await response.json();
    return data.success ? data.data : [];
  } catch (error) {
    console.error('Error fetching stats:', error);
    return [];
  }
}

export async function getTopProjects(featured?: boolean): Promise<TopProject[]> {
  try {
    const params = new URLSearchParams();
    if (featured) params.append('featured', 'true');
    
    const response = await fetch(`${API_URL}/top-projects?${params.toString()}`);
    const data = await response.json();
    return data.success ? data.data : [];
  } catch (error) {
    console.error('Error fetching top projects:', error);
    return [];
  }
}


export async function submitContact(formData: {
  name: string;
  email: string;
  phone?: string;
  subject?: string;
  message: string;
}): Promise<{ success: boolean; message: string }> {
  try {
    const response = await fetch(`${API_URL}/contact`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error submitting contact:', error);
    return { success: false, message: 'Failed to submit contact form' };
  }
}
