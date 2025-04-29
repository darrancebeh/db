export interface Project {
  id: number;
  title: string;
  imageUrl: string;
  description: string;
  techStack: string[];
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
    githubUrl: 'https://github.com/darrancebeh/db',
    livePreviewUrl: 'https://db-gamma-khaki.vercel.app/',
  },
  {
    id: 2,
    title: 'Tic-my-Toe',
    imageUrl: '/images/project-ticmytoe-screenshot.png',
    description: 'Tic-my-Toe is a web-based Player vs AI approach to Tic-Tac-Toe utilizing reinforcement learning. Preview Hosting Soon.',
    techStack: ['Next.js', 'React', 'FastAPI', 'Pydantic', 'Tailwind CSS'],
    githubUrl: 'https://github.com/darrancebeh/word4word',
  },
  {
    id: 3,
    title: 'Monte Carlol',
    imageUrl: '/images/project-montecarlol-screenshot.png',
    description: 'Monte-carlol is an interactive Monte Carlo simulation for stock price forecasting with real-time visualization. Preview Hosting Soon.',
    techStack: ['Next.js', 'React', 'FastAPI', 'Pydantic', 'Recharts', 'Tailwind CSS'],
    githubUrl: 'https://github.com/darrancebeh/monte-carlol',
  },
   {
    id: 4,
    title: 'Word-4-Word',
    imageUrl: '/images/project-word4word-screenshot.png',
    description: 'Word-4-Word is a web-based OCR application that recognizes text from handwriting drawn by users on a canvas. Preview Hosting Soon.',
    techStack: ['Next.js', 'React', 'FastAPI', 'PaddleOCR', 'Pillow', 'Tailwind CSS'],
    githubUrl: 'https://github.com/darrancebeh/word4word',
  },
  {
    id: 5,
    title: 'Placeholder project',
    imageUrl: '/images/project4_placeholder.png',
    description: 'Lorem ipsum bridge is falling down.',
    techStack: ['lorem', 'ipsum', 'html CSS'],
    githubUrl: 'https://github.com/darrancebeh',
  },
];