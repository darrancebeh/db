'use client'; // Add this directive for client-side hooks and interactivity

import React from 'react';
import { motion } from 'framer-motion';
import { FiGithub, FiExternalLink } from 'react-icons/fi';
import { projects, Project } from '../../data/projects'; // Import all projects and the interface
import '../../components/ProjectPortfolio.css'; // Reuse the existing styles

// Animation variants (can be reused or adapted)
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1, // Stagger animation for each card
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

const cardHoverAnimation = {
  y: -6,
  boxShadow: "0 18px 40px rgba(0, 0, 0, 0.55)",
  borderColor: "rgba(255, 255, 255, 0.3)",
  transition: { duration: 0.2 }
};

function ProjectsPage() {
  // No need for cursor variant logic here unless specifically required for this page

  return (
    <motion.section
      className="portfolio-section" // Reuse the main section class
      aria-labelledby="all-projects-heading"
      initial="hidden"
      animate="visible" // Animate on load
      variants={containerVariants}
    >
      <h1 id="all-projects-heading" className="section-heading">
        All Projects
      </h1>
      <motion.div
        className="portfolio-grid" // Reuse the grid class
        variants={containerVariants} // Apply container variants for staggering
      >
        {projects.map((project: Project) => ( // Map over ALL projects
          <motion.div
            key={project.id}
            className="project-card" // Reuse the card class
            variants={itemVariants} // Apply item variants for individual animation
            whileHover={cardHoverAnimation} // Apply hover animation
            // Add layout prop for smoother animations if needed: layout
          >
            <img src={project.imageUrl} alt={`${project.title} screenshot`} className="project-image" />
            <div className="project-content">
              <h3 className="project-title">{project.title}</h3>
              <div className="project-tech-stack">
                {project.techStack.map((tech) => (
                  <span key={tech} className="tech-badge">{tech}</span>
                ))}
              </div>
              <p className="project-description">{project.description}</p>
              <div className="project-links">
                {project.githubUrl && (
                  <motion.a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="project-button github" // Reuse button styles
                    whileHover={{ scale: 1.05, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    // Add cursor handlers if needed
                  >
                    <FiGithub className="w-4 h-4" /> GitHub
                  </motion.a>
                )}
                {project.livePreviewUrl && (
                  <motion.a
                    href={project.livePreviewUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="project-button preview" // Reuse button styles
                    whileHover={{ scale: 1.05, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    // Add cursor handlers if needed
                  >
                    <FiExternalLink className="w-4 h-4" /> Live Preview
                  </motion.a>
                )}
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>
      {/* No "View More" button needed here */}
    </motion.section>
  );
}

export default ProjectsPage;
