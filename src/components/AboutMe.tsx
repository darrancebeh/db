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
  // Add state to control if the hover effect is allowed
  const [allowHoverEffect, setAllowHoverEffect] = useState(true);

  const handleToggle = (newState: ProfileState) => {
    if (activeState !==newState) {
        setActiveState(newState);
        // Reset hover effect allowance when toggling via buttons
        setAllowHoverEffect(true);
    }
  };

  const handleImageClick = () => {
    // Toggle state
    setActiveState(prevState => prevState === 'personal' ? 'developer' : 'personal');
    // Disable hover effect immediately after click
    setAllowHoverEffect(false);
    // Keep isHoveringImage true if mouse is still over, but effect is disabled
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
  // isHovering is now only used for the container class, not image fade
  const isHovering = isHoveringImage || isHoveringControls;

  const personalImageUrl = '/images/darrance-personal-portrait.jpg';
  const developerImageUrl = '/images/db-dev-portrait.png';

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
    // Also reset hover states when leaving the whole component
    setIsHoveringImage(false);
    setIsHoveringControls(false);
    setAllowHoverEffect(true); // Ensure hover is allowed next time
  };

  // Specific handlers for image hover
  const handleImageMouseEnter = () => {
    setIsHoveringImage(true);
    // Hover effect is allowed by default on enter unless recently clicked
  };

  const handleImageMouseLeave = () => {
    setIsHoveringImage(false);
    // Re-enable hover effect when mouse leaves the image area
    setAllowHoverEffect(true);
  };


  // Determine if the hover visual effect should be active
  const showHoverVisual = isHoveringImage && allowHoverEffect;

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
          onMouseEnter={handleImageMouseEnter} // Use specific handler
          onMouseLeave={handleImageMouseLeave} // Use specific handler
          title={isPersonalActive ? "Switch to Developer Profile" : "Switch to Personal Profile"}
        >
           <img
             key={`primary-${activeState}`} // Add key based on activeState
             src={isPersonalActive ? personalImageUrl : developerImageUrl}
             alt={isPersonalActive ? "Darrance" : "db"}
             // Apply fade based on showHoverVisual
             className={`profile-image ${showHoverVisual ? 'fade-out' : 'fade-in'}`}
          />
           <img
             key={`hover-${activeState}`} // Add key based on activeState
             src={isPersonalActive ? developerImageUrl : personalImageUrl}
             alt={isPersonalActive ? "db" : "Darrance"}
             // Apply fade based on showHoverVisual
             className={`profile-image profile-image-hover ${showHoverVisual ? 'fade-in' : 'fade-out'}`}
          />
        </div>
        <div
            className="toggle-controls"
            // Keep internal hover logic for controls if needed, or simplify
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

      {/* Right Section - Apply Tailwind padding and flex alignment */}
      <div className="flex-1 p-8 md:p-12 flex flex-col justify-center relative z-10"> {/* Added padding, flex properties */}
         {/* Use Tailwind text colors - Refined for minimalistic look */}
         <div className={`content personal-content ${isPersonalActive ? 'visible' : ''}`}>
            {/* Adjusted heading size, weight, margin and color */}
            <h2 className="text-2xl font-medium mb-6 text-gray-200">About Darrance</h2>
            {/* Adjusted paragraph color and line height */}
            <p className="text-base text-gray-400 leading-loose"> 
              Darrance is currently pursuing a Bachelor's degree in Computer Science at Sunway University, where he has been distinguished as a top-performing student by CGPA. He has also displayed many leadership experience as a student, including being the Vice President of the Sunway Business Investment Society, and Head of Events of the Sunway Blockchain Club.
              <br/><br/>
              Darrance is also an active investor in the US markets, a journey he began since 2019 with a modest initial capital of RM600. Since then, he has achieved significant personal financial milestones, including funding his own university tuition. This experience was also what initially sparked his interest into Data Analysis, and subsequently Quantitative Finance and AI/ML.
            </p>
         </div>
         {/* Use Tailwind text colors - Refined for minimalistic look */}
         <div className={`content developer-content ${!isPersonalActive ? 'visible' : ''}`}>
             {/* Adjusted heading size, weight, margin and color */}
            <h2 className="text-2xl font-medium mb-6 text-gray-200">About db</h2>
             {/* Adjusted paragraph color and line height */}
            <p className="text-base text-gray-400 leading-loose"> 
            db’s first exposure to programming and coding dates back to when he was 15 in 2018, when he wanted to solve math problems quicker and more efficiently. Since then, he started his journey with C++, self-taught from a YouTube video, which got him hooked into a hobby that he would continue for years throughout highschool - competitive programming. 
            <br></br><br></br>
            Simultaneously evolving alongside his new competitive programming hobby was his fascination of using programming for problem solving, which evolved into projects to solve very niche and specific problems, such as a data visualization and analysis tool for market data for US stocks and options to make it easier to understand big data, and random hobby projects such as Blackjack and all sorts of random stuff. Since then, his passion of problem solving and development only grew stronger.
            </p>
         </div>
      </div>
    </div>
  );
};

export default AboutMe;