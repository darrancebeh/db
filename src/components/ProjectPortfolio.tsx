import React, { useState, useEffect, useRef } from 'react'; // Import useEffect and useRef
import { motion, AnimatePresence } from 'framer-motion';
import { FiGithub, FiExternalLink, FiArrowRight, FiX } from 'react-icons/fi';
import './ProjectPortfolio.css';
import { Dispatch, SetStateAction } from 'react';
import { projects } from '../data/projects';

type CursorVariant = 'default' | 'interactive' | 'lightArea';

// Define animation variants
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

// Add modal animation variants
const modalBackdropVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
  exit: { opacity: 0 },
};

const modalContentVariants = {
  hidden: { scale: 0.9, opacity: 0 },
  visible: { scale: 1, opacity: 1, transition: { type: 'spring', stiffness: 300, damping: 30 } },
  exit: { scale: 0.9, opacity: 0 },
};

// Define the props for the ProjectPortfolio component
interface ProjectPortfolioProps {
  setCursorVariant: Dispatch<SetStateAction<CursorVariant>>;
}

const ProjectPortfolio: React.FC<ProjectPortfolioProps> = ({ setCursorVariant }) => {
  // --- CHANGE FEATURED COUNT ---
  const FEATURED_PROJECTS_COUNT = 6;
  // --- END CHANGE ---
  const [isModalOpen, setIsModalOpen] = useState(false);
  const modalGridRef = useRef<HTMLDivElement>(null); // Ref for the scrollable grid container

  const handleMouseEnterInteractive = () => setCursorVariant('interactive');
  const handleMouseLeaveDefault = () => setCursorVariant('default');

  const openModal = () => {
    setIsModalOpen(true);
    setCursorVariant('default');
  };
  const closeModal = () => setIsModalOpen(false);

  // Effect to handle body scroll lock and redirect wheel events
  useEffect(() => {
    const body = document.body;
    const originalOverflow = body.style.overflow;
    const modalGridElement = modalGridRef.current;

    const handleWheel = (e: WheelEvent) => {
      if (modalGridElement) {
        // Prevent default window scroll
        e.preventDefault();
        // Manually scroll the modal grid container
        modalGridElement.scrollTop += e.deltaY;
      }
    };

    if (isModalOpen) {
      body.style.overflow = 'hidden'; // Prevent body scrolling
      // Add wheel listener to the window to capture scroll events everywhere
      window.addEventListener('wheel', handleWheel, { passive: false });
    } else {
      body.style.overflow = originalOverflow; // Restore body scrolling
    }

    // Cleanup function
    return () => {
      body.style.overflow = originalOverflow; // Ensure restoration on unmount/close
      // Remove the listener when modal closes or component unmounts
      window.removeEventListener('wheel', handleWheel);
    };
  }, [isModalOpen]); // Rerun effect when modal state changes

  // Define hover animation for cards
  const cardHoverAnimation = {
    y: -6,
    boxShadow: "0 18px 40px rgba(0, 0, 0, 0.55)",
    borderColor: "rgba(255, 255, 255, 0.3)",
    transition: { duration: 0.2 }
  };

  // Helper function to get category class
  const getCategoryClass = (category: string) => {
    switch (category.toLowerCase()) {
      case 'ai/ml': return 'category-color-ai-ml'; // Use color-specific classes
      case 'data science': return 'category-color-data-science';
      case 'web development': return 'category-color-web-dev';
      case 'frontend': return 'category-color-frontend';
      case 'backend': return 'category-color-backend';
      case 'full stack': return 'category-color-full-stack';
      case 'finance': return 'category-color-finance';
      case 'placeholder': return 'category-color-placeholder';
      case 'ocr': return 'category-color-ocr';
      default: return 'category-color-default';
    }
  };

  return (
    <motion.section
      className="portfolio-section bg-gradient-animate"
      aria-labelledby="portfolio-heading"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.1 }} // Trigger earlier
      variants={containerVariants}
      onMouseEnter={handleMouseEnterInteractive} // Apply to section for general area
      onMouseLeave={handleMouseLeaveDefault}   // Apply to section for general area
    >
      {/* Changed heading */}
      <h2 id="portfolio-heading" className="section-heading">Featured Projects</h2>
      <motion.div
        className="portfolio-grid"
        variants={containerVariants} // Use container variants for staggering children
      >
        {/* Slice the array to show only featured projects */}
        {projects.slice(0, FEATURED_PROJECTS_COUNT).map((project) => (
          <motion.div
            key={project.id}
            className="project-card"
            variants={itemVariants}
            initial="hidden" // Apply initial state for staggering
            animate="visible" // Apply visible state for staggering
            whileHover={cardHoverAnimation}
            // Keep hover handlers on individual cards for precision
            onMouseEnter={handleMouseEnterInteractive}
            onMouseLeave={handleMouseEnterInteractive} // Keep interactive if moving between cards
          >
            <img src={project.imageUrl} alt={`${project.title} screenshot`} className="project-image" />
            <div className="project-content">
              <h3 className="project-title">{project.title}</h3>
              {/* --- UPDATE CATEGORIES --- */}
              <div className="project-categories">
                {project.categories.map((category, index) => (
                  <React.Fragment key={category}>
                    <span className={`category-text ${getCategoryClass(category)}`}>
                      {category}
                    </span>
                    {/* Add a separator except for the last item */}
                    {index < project.categories.length - 1 && (
                      <span className="category-separator"> • </span>
                    )}
                  </React.Fragment>
                ))}
              </div>
              {/* --- END UPDATE CATEGORIES --- */}
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
                    className="project-button github"
                    whileHover={{ scale: 1.05, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    onMouseEnter={handleMouseEnterInteractive}
                    onMouseLeave={handleMouseEnterInteractive}
                  >
                    <FiGithub className="w-4 h-4" /> GitHub
                  </motion.a>
                )}
                {project.livePreviewUrl && (
                  <motion.a
                    href={project.livePreviewUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="project-button preview"
                    whileHover={{ scale: 1.05, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    onMouseEnter={handleMouseEnterInteractive}
                    onMouseLeave={handleMouseEnterInteractive}
                  >
                    <FiExternalLink className="w-4 h-4" /> Live Preview
                  </motion.a>
                )}
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>

      {/* View All Projects Button Container */}
      <motion.div
        className="view-more-container" // Keep class name for styling consistency
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }} // Delay slightly after initial cards load
      >
        {/* Button opens expanded window with all projects */}
        <motion.button
          className="project-button view-more"
          whileHover={{ scale: 1.05, y: -2 }}
          whileTap={{ scale: 0.95 }}
          onMouseEnter={handleMouseEnterInteractive}
          onMouseLeave={handleMouseLeaveDefault}
          onClick={openModal} // Add onClick handler
        >
          View All Projects <FiArrowRight className="w-5 h-5 ml-1 inline" />
        </motion.button>
      </motion.div>

      {/* Modal for All Projects */}
      <AnimatePresence>
        {isModalOpen && (
          <motion.div
            className="modal-backdrop"
            variants={modalBackdropVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            onClick={closeModal} // Close modal on backdrop click
            onMouseEnter={handleMouseLeaveDefault} // Ensure cursor is default over backdrop
            onMouseLeave={handleMouseLeaveDefault}
          >
            <motion.div
              className="modal-content"
              variants={modalContentVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside content
              onMouseEnter={handleMouseEnterInteractive} // Interactive cursor over modal content
              onMouseLeave={handleMouseEnterInteractive}
            >
              <motion.button
                className="modal-close-button"
                onClick={closeModal}
                whileHover={{ scale: 1.1, rotate: 90 }}
                whileTap={{ scale: 0.9 }}
                onMouseEnter={handleMouseEnterInteractive}
                onMouseLeave={handleMouseEnterInteractive}
              >
                <FiX size={24} />
              </motion.button>
              <h2 className="modal-heading">All Projects</h2>
              {/* Add ref to the scrollable container */}
              <div ref={modalGridRef} className="modal-grid-container">
                <div className="portfolio-grid">
                  {projects.map((project) => (
                    // Reusing the project card structure from above
                    <motion.div
                      key={project.id}
                      className="project-card"
                      whileHover={cardHoverAnimation} // Apply hover animation
                      // No itemVariants needed here unless staggering is desired inside modal
                      onMouseEnter={handleMouseEnterInteractive}
                      onMouseLeave={handleMouseEnterInteractive}
                    >
                      <img src={project.imageUrl} alt={`${project.title} screenshot`} className="project-image" />
                      <div className="project-content">
                        <h3 className="project-title">{project.title}</h3>
                        {/* --- UPDATE CATEGORIES --- */}
                        <div className="project-categories">
                          {project.categories.map((category, index) => (
                            <React.Fragment key={category}>
                              <span className={`category-text ${getCategoryClass(category)}`}>
                                {category}
                              </span>
                              {/* Add a separator except for the last item */}
                              {index < project.categories.length - 1 && (
                                <span className="category-separator"> • </span>
                              )}
                            </React.Fragment>
                          ))}
                        </div>
                        {/* --- END UPDATE CATEGORIES --- */}
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
                              className="project-button github"
                              whileHover={{ scale: 1.05, y: -2 }}
                              whileTap={{ scale: 0.95 }}
                              onMouseEnter={handleMouseEnterInteractive}
                              onMouseLeave={handleMouseEnterInteractive}
                            >
                              <FiGithub className="w-4 h-4" /> GitHub
                            </motion.a>
                          )}
                          {project.livePreviewUrl && (
                            <motion.a
                              href={project.livePreviewUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="project-button preview"
                              whileHover={{ scale: 1.05, y: -2 }}
                              whileTap={{ scale: 0.95 }}
                              onMouseEnter={handleMouseEnterInteractive}
                              onMouseLeave={handleMouseEnterInteractive}
                            >
                              <FiExternalLink className="w-4 h-4" /> Live Preview
                            </motion.a>
                          )}
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.section>
  );
};

export default ProjectPortfolio;