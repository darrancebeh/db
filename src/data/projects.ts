export interface Project {
  id: number;
  title: string;
  imageUrl: string;
  description: string;
  techStack: string[];
  categories: string[];
  githubUrl?: string;
  livePreviewUrl?: string;
}

export const projects: Project[] = [
  {
    id: 1,
    title: 'Project: {db}',
    imageUrl: '/images/project-db-screenshot.png',
    description: 'The current website. Project: {db} is my personal portfolio website showcasing my profile and technical skills.',
    techStack: ['Next.js', 'React', 'TypeScript', 'Tailwind CSS'],
    categories: ['Web Development', 'Frontend'],
    githubUrl: 'https://github.com/darrancebeh/db',
    livePreviewUrl: 'https://db-gamma-khaki.vercel.app/',
  },
  {
    id: 2,
    title: 'Tic-my-Toe',
    imageUrl: '/images/project-ticmytoe-screenshot.png',
    description: 'Tic-my-Toe is a web-based Player vs AI approach to Tic-Tac-Toe utilizing reinforcement learning. Preview Hosting Soon.',
    techStack: ['Next.js', 'React', 'FastAPI', 'Pydantic', 'Tailwind CSS'],
    categories: ['AI/ML', 'Web Development', 'Full Stack'],
    githubUrl: 'https://github.com/darrancebeh/word4word', // Note: This seems to point to word4word repo, might need correction
  },
  {
    id: 3,
    title: 'Monte Carlol',
    imageUrl: '/images/project-montecarlol-screenshot.png',
    description: 'Monte-carlol is an interactive Monte Carlo simulation for stock price forecasting with real-time visualization. Preview Hosting Soon.',
    techStack: ['Next.js', 'React', 'FastAPI', 'Pydantic', 'Recharts', 'Tailwind CSS'],
    categories: ['Data Science', 'Web Development', 'Full Stack', 'Finance'],
    githubUrl: 'https://github.com/darrancebeh/monte-carlol',
  },
   {
    id: 4,
    title: 'Word-4-Word',
    imageUrl: '/images/project-word4word-screenshot.png',
    description: 'Word-4-Word is a web-based OCR application that recognizes text from handwriting drawn by users on a canvas. Preview Hosting Soon.',
    techStack: ['Next.js', 'React', 'FastAPI', 'PaddleOCR', 'Pillow', 'Tailwind CSS'],
    categories: ['AI/ML', 'OCR', 'Web Development', 'Full Stack'],
    githubUrl: 'https://github.com/darrancebeh/word4word',
  }
  // Add more projects here if needed, ensuring they also have categories
];