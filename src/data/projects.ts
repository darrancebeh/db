export interface Project {
  id: number;
  title: string;
  imageUrl: string;
  description: string;
  techStack: string[];
  categories: string[]; // Added categories field
  githubUrl?: string; // Optional
  livePreviewUrl?: string; // Optional
}

export const projects: Project[] = [
  {
    id: 1,
    title: 'Project: {db}',
    imageUrl: '/images/project-db-screenshot.png',
    description: 'The current website. Project: {db} is my personal portfolio website showcasing my profile and technical skills.',
    techStack: ['Next.js', 'React', 'TypeScript', 'Tailwind CSS'],
    categories: ['Web Development', 'Frontend'], // Added categories
    githubUrl: 'https://github.com/darrancebeh/db',
    livePreviewUrl: 'https://db-gamma-khaki.vercel.app/',
  },
  {
    id: 2,
    title: 'Tic-my-Toe',
    imageUrl: '/images/project-ticmytoe-screenshot.png',
    description: 'Tic-my-Toe is a web-based Player vs AI approach to Tic-Tac-Toe utilizing reinforcement learning. Preview Hosting Soon.',
    techStack: ['Next.js', 'React', 'FastAPI', 'Pydantic', 'Tailwind CSS'],
    categories: ['AI/ML', 'Web Development', 'Full Stack'], // Added categories
    githubUrl: 'https://github.com/darrancebeh/word4word', // Note: This seems to point to word4word repo, might need correction
  },
  {
    id: 3,
    title: 'Monte Carlol',
    imageUrl: '/images/project-montecarlol-screenshot.png',
    description: 'Monte-carlol is an interactive Monte Carlo simulation for stock price forecasting with real-time visualization. Preview Hosting Soon.',
    techStack: ['Next.js', 'React', 'FastAPI', 'Pydantic', 'Recharts', 'Tailwind CSS'],
    categories: ['Data Science', 'Web Development', 'Full Stack', 'Finance'], // Added categories
    githubUrl: 'https://github.com/darrancebeh/monte-carlol',
  },
   {
    id: 4,
    title: 'Word-4-Word',
    imageUrl: '/images/project-word4word-screenshot.png',
    description: 'Word-4-Word is a web-based OCR application that recognizes text from handwriting drawn by users on a canvas. Preview Hosting Soon.',
    techStack: ['Next.js', 'React', 'FastAPI', 'PaddleOCR', 'Pillow', 'Tailwind CSS'],
    categories: ['AI/ML', 'OCR', 'Web Development', 'Full Stack'], // Added categories
    githubUrl: 'https://github.com/darrancebeh/word4word',
  },
  {
    id: 5,
    title: 'Placeholder project 1', // Updated title
    imageUrl: '/images/project4_placeholder.png', // Consider unique placeholder images
    description: 'This is a placeholder description for a future project. Details coming soon.', // Updated description
    techStack: ['Tech 1', 'Tech 2', 'Tech 3'], // Placeholder tech
    categories: ['Placeholder'], // Added categories
    githubUrl: 'https://github.com/darrancebeh',
  },
  {
    id: 6, // Added new project
    title: 'Placeholder project 2',
    imageUrl: '/images/project5_placeholder.png', // Needs a new placeholder image
    description: 'Another placeholder project description. Stay tuned for updates.',
    techStack: ['Tech A', 'Tech B', 'Tech C'],
    categories: ['Placeholder'], // Added categories
    githubUrl: 'https://github.com/darrancebeh',
  },
  // Add more projects here if needed, ensuring they also have categories
];