import React, { useState, useEffect } from 'react';
import { FaUser, FaCode } from 'react-icons/fa';
import './AboutMe.css';

type ProfileState = 'personal' | 'developer';
type CursorVariant = 'default' | 'interactive' | 'lightArea';

interface AboutMeProps {
  setCursorVariant: (variant: CursorVariant) => void;
}

const AboutMe: React.FC<AboutMeProps> = ({ setCursorVariant }) => {
  const [activeState, setActiveState] = useState<ProfileState>('personal');
  const [isHoveringImage, setIsHoveringImage] = useState(false);
  const [isHoveringControls, setIsHoveringControls] = useState(false);
  const [isMouseInside, setIsMouseInside] = useState(false);

  const handleToggle = (newState: ProfileState) => {
    if (activeState !== newState) {
        setActiveState(newState);
    }
  };

  const handleImageClick = () => {
    // setActiveState triggers the useEffect below
    setActiveState(prevState => prevState === 'personal' ? 'developer' : 'personal');
  };

  // useEffect to update cursor when activeState changes *while* mouse is inside
  useEffect(() => {
    // Only update if the mouse is currently inside the component bounds
    if (isMouseInside) {
      if (activeState === 'personal') {
        setCursorVariant('lightArea');
      } else {
        setCursorVariant('interactive');
      }
    }
    // Dependency array includes activeState and isMouseInside
  }, [activeState, isMouseInside, setCursorVariant]);


  const isPersonalActive = activeState === 'personal';
  const isHovering = isHoveringImage || isHoveringControls;

  const personalImageUrl = '/images/darrance-personal.jpg';
  const developerImageUrl = '/images/db-developer.jpg';

  // Update root handlers to manage isMouseInside state
  const handleRootMouseEnter = () => {
    setIsMouseInside(true);
    // Set initial cursor based on current state when entering
    if (activeState === 'personal') {
      setCursorVariant('lightArea');
    } else {
      setCursorVariant('interactive');
    }
  };

  const handleRootMouseLeave = () => {
    setIsMouseInside(false);
    // Reset to default when leaving the component
    setCursorVariant('default');
  };

  return (
    <div
      className={`about-me-container state-${activeState} ${isHovering ? 'hovering' : ''}`}
      onMouseEnter={handleRootMouseEnter}
      onMouseLeave={handleRootMouseLeave}
    >
      {/* Left Section */}
      <div className="left-section">
        <div
          className="image-container"
          onClick={handleImageClick}
          onMouseEnter={() => setIsHoveringImage(true)}
          onMouseLeave={() => setIsHoveringImage(false)}
          title={isPersonalActive ? "Switch to Developer Profile" : "Switch to Personal Profile"}
        >
           <img
             src={isPersonalActive ? personalImageUrl : developerImageUrl}
             alt={isPersonalActive ? "Darrance" : "db"}
             className={`profile-image ${isHoveringImage ? 'fade-out' : 'fade-in'}`}
          />
           <img
             src={isPersonalActive ? developerImageUrl : personalImageUrl}
             alt={isPersonalActive ? "db" : "Darrance"}
             className={`profile-image profile-image-hover ${isHoveringImage ? 'fade-in' : 'fade-out'}`}
          />
        </div>
        <div
            className="toggle-controls"
            // Keep internal hover logic for content peek effect
            onMouseEnter={() => setIsHoveringControls(true)}
            onMouseLeave={() => setIsHoveringControls(false)}
        >
          <button
            onClick={() => handleToggle('personal')}
            className={`toggle-button ${isPersonalActive ? 'active' : ''}`}
            aria-label="Show Personal Profile"
            aria-pressed={isPersonalActive}
          >
            <FaUser />
          </button>
          <span className="toggle-separator">|</span>
          <button
            onClick={() => handleToggle('developer')}
            className={`toggle-button toggle-icon ${!isPersonalActive ? 'active' : ''}`}
            aria-label="Show Developer Profile"
            aria-pressed={!isPersonalActive}
          >
            <FaCode />
          </button>
        </div>
      </div>

      {/* Separator Line */}
      <div className="separator-line"></div>

      {/* Right Section */}
      <div className="right-section">
         <div className={`content personal-content ${isPersonalActive && !isHovering ? 'visible' : ''} ${!isPersonalActive && isHovering ? 'peek' : ''}`}>
            <h2>About Darrance</h2>
            <p>This is the personal description for Darrance. Focused on hobbies, interests, and life outside of code. Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
         </div>
         <div className={`content developer-content ${!isPersonalActive && !isHovering ? 'visible' : ''} ${isPersonalActive && isHovering ? 'peek' : ''}`}>
            <h2>About db</h2>
            <p>This is the developer description for db. Highlighting technical skills, projects, and professional experience. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
         </div>
      </div>
    </div>
  );
};

export default AboutMe;