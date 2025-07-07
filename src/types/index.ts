export interface User {
  _id: string;
  name: string;
  email: string;
  role: 'admin' | 'employer' | 'jobseeker';
  avatar?: string;
  createdAt: string;
  updatedAt: string;
}

export interface Job {
  _id: string;
  title: string;
  description: string;
  company: string;
  location: string;
  salary: {
    min: number;
    max: number;
  };
  type: 'full-time' | 'part-time' | 'contract' | 'internship';
  requirements: string[];
  postedBy: string;
  applications: string[];
  ratings: Rating[];
  averageRating: number;
  createdAt: string;
  updatedAt: string;
}

export interface Application {
  _id: string;
  jobId: string;
  userId: string;
  status: 'pending' | 'accepted' | 'rejected';
  coverLetter: string;
  resume: string;
  createdAt: string;
  updatedAt: string;
}

export interface Rating {
  _id: string;
  userId: string;
  jobId: string;
  rating: number;
  comment: string;
  createdAt: string;
}

export interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  loading: boolean;
}