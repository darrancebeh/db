import React, { useState, useEffect } from 'react';
import { FaUser, FaCode } from 'react-icons/fa';
import './AboutMe.css';

interface AboutMeProps {
  setCursorVariant: (variant: CursorVariant) => void;
}
type ProfileState = 'personal' | 'developer';
type CursorVariant = 'default' | 'interactive' | 'lightArea';

const AboutMe: React.FC<AboutMeProps> = ({ setCursorVariant }) => {
  const [activeState, setActiveState] = useState<ProfileState>('developer');
  const [isHoveringImage, setIsHoveringImage] = useState(false);
  const [isMouseInside, setIsMouseInside] = useState(false);
  const [allowHoverEffect, setAllowHoverEffect] = useState(true);

  const handleToggle = (newState: ProfileState) => {
    if (activeState !==newState) {
        setActiveState(newState);
        setAllowHoverEffect(true);
    }
  };

  const handleImageClick = () => {
    setActiveState(prevState => prevState === 'personal' ? 'developer' : 'personal');
    setAllowHoverEffect(false);
  };

  useEffect(() => {
    if (isMouseInside) {
      if (activeState === 'personal') {
        setCursorVariant('lightArea');
      } else {
        setCursorVariant('interactive');
      }
    }
  }, [activeState, isMouseInside, setCursorVariant]);


  const isPersonalActive = activeState === 'personal';

  const personalImageUrl = '/images/darrance-personal-portrait.jpg';
  const developerImageUrl = '/images/db-dev-portrait.png';

  const handleRootMouseEnter = () => {
    setIsMouseInside(true);
    if (activeState === 'personal') {
      setCursorVariant('lightArea');
    } else {
      setCursorVariant('interactive');
    }
  };

  const handleRootMouseLeave = () => {
    setIsMouseInside(false);
    setCursorVariant('default');
    setIsHoveringImage(false);
    setAllowHoverEffect(true);
  };

  const handleImageMouseEnter = () => {
    setIsHoveringImage(true);
  };

  const handleImageMouseLeave = () => {
    setIsHoveringImage(false);
    setAllowHoverEffect(true);
  };


  const showHoverVisual = isHoveringImage && allowHoverEffect;

  return (
    <div
      className={`about-me-container state-${activeState}`}
      onMouseEnter={handleRootMouseEnter}
      onMouseLeave={handleRootMouseLeave}
    >
      {/* Left Section */}
      <div className="left-section">
        <div
          className="image-container"
          onClick={handleImageClick}
          onMouseEnter={handleImageMouseEnter}
          onMouseLeave={handleImageMouseLeave}
          title={isPersonalActive ? "Switch to Developer Profile" : "Switch to Personal Profile"}
        >
           <img
             key={`primary-${activeState}`}
             src={isPersonalActive ? personalImageUrl : developerImageUrl}
             alt={isPersonalActive ? "Darrance" : "db"}
             className={`profile-image ${showHoverVisual ? 'fade-out' : 'fade-in'}`}
          />
           <img
             key={`hover-${activeState}`}
             src={isPersonalActive ? developerImageUrl : personalImageUrl}
             alt={isPersonalActive ? "db" : "Darrance"}
             className={`profile-image profile-image-hover ${showHoverVisual ? 'fade-in' : 'fade-out'}`}
          />
        </div>
        <div
            className="toggle-controls"
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
            className={`toggle-button ${!isPersonalActive ? 'active' : ''}`}
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
      <div className="right-section flex flex-col justify-center relative">
         {/* Content divs now only control visibility */}
         <div className={`content personal-content ${isPersonalActive ? 'visible' : ''}`}>
            <h2>About Darrance</h2>
            <p>
              Darrance is currently pursuing a Bachelor&apos;s degree in Computer Science at Sunway University, where he has been distinguished as a <span className="highlight-personal">top-performing student by CGPA</span>. He has also displayed many leadership experience as a student, including being the <span className="highlight-personal">Vice President of the Sunway Business Investment Society</span>, and <span className="highlight-personal">Head of Events of the Sunway Blockchain Club</span>.
              <br/><br/>
              Darrance is also an <span className="highlight-personal">active investor in the US markets</span>, a journey he began since 2019 with a modest initial capital of RM600. Since then, he has achieved significant personal financial milestones, including <span className="highlight-personal">funding his own university tuition</span>. This experience was also what initially sparked his interest into <span className="highlight-personal">Data Analysis</span>, and subsequently <span className="highlight-personal">Quantitative Finance</span> and <span className="highlight-personal">AI/ML</span>.
            </p>
         </div>

         <div className={`content developer-content ${!isPersonalActive ? 'visible' : ''}`}>
            <h2>About db</h2>
            <p>
            db&apos;s <span className="highlight-developer">first exposure to programming and coding dates back to when he was 15 in 2018</span>, when he wanted to solve math problems quicker and more efficiently. Since then, he started his journey with <span className="highlight-developer">C++, self-taught</span> from a YouTube video, which got him hooked into a hobby that he would continue for years throughout highschool - <span className="highlight-developer">competitive programming</span>.
            <br/><br/>
            Simultaneously evolving alongside his new competitive programming hobby was his fascination of using programming for <span className="highlight-developer">problem solving</span>, which evolved into projects to solve very niche and specific problems, such as a <span className="highlight-developer">data visualization and analysis tool for market data</span> for US stocks and options to make it easier to understand big data, and random hobby projects such as Blackjack and all sorts of random stuff. Since then, his <span className="highlight-developer">passion of problem solving and development only grew stronger</span>.
            </p>
         </div>
      </div>
    </div>
  );
};

export default AboutMe;