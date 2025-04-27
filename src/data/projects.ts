// Define the structure for a project
export interface Project {
  id: number;
  title: string;
  imageUrl: string;
  description: string;
  techStack: string[];
  githubUrl?: string; // Optional
  livePreviewUrl?: string; // Optional
}

// Sample project data
export const projects: Project[] = [
  {
    id: 1,
    title: 'Project: {db}',
    imageUrl: '/images/project-db-screenshot.png',
    description: 'The current website. Project: {db} is my personal portfolio website showcasing my profile and technical skills.',
    techStack: ['Next.js', 'React', 'TypeScript', 'Tailwind CSS'],
    githubUrl: 'https://github.com/darrancebeh/db',
    livePreviewUrl: 'https://yourwebsite.com',
  },
  {
    id: 2,
    title: 'Word-4-Word',
    imageUrl: '/images/project-word4word-screenshot.png',
    description: 'Word-4-Word is a web-based OCR application that recognizes text from handwriting drawn by users on a canvas. Preview Hosting Soon.',
    techStack: ['Next.js', 'React', 'FastAPI', 'PaddleOCR', 'Pillow'],
    githubUrl: 'https://github.com/darrancebeh/word4word',
  },
  {
    id: 3,
    title: 'Data Visualization Dashboard',
    imageUrl: '/images/project3_placeholder.png',
    description: 'An interactive dashboard for visualizing complex datasets using D3.js.',
    techStack: ['React', 'D3.js', 'Node.js', 'CSS'],
    githubUrl: 'https://github.com/yourusername/data-viz-dashboard',
    livePreviewUrl: 'https://your-viz-dashboard.com',
  },
   {
    id: 4,
    title: 'Task Management App',
    imageUrl: '/images/project4_placeholder.png',
    description: 'A simple task management app with drag-and-drop functionality.',
    techStack: ['React', 'TypeScript', 'Tailwind CSS'], // Assuming Tailwind, adjust if needed
    githubUrl: 'https://github.com/yourusername/task-app',
  },
  {
    id: 5,
    title: 'Blog Platform API',
    imageUrl: '/images/project5_placeholder.png',
    description: 'A RESTful API for a blog platform built with Python and Flask.',
    techStack: ['Python', 'Flask', 'SQLAlchemy', 'PostgreSQL'],
    githubUrl: 'https://github.com/yourusername/blog-api',
  },
  // Add more projects here if needed
];