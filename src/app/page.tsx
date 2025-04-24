"use client";
import { useState } from "react";
import LandingPage from "../components/LandingPage";


export default function Home() {
  // If you want to create a single page application with sections
  // you can keep it simple like this
  return (
    <main>
      <LandingPage />
     
    </main>
  );
  
  /* Alternative: For more complex navigation between sections
  const [activeSection, setActiveSection] = useState("landing");
  
  return (
    <main>
      {activeSection === "landing" && <LandingPage onNavigate={setActiveSection} />}
      {activeSection === "techstack" && <TechStack onNavigate={setActiveSection} />}
      {activeSection === "contact" && <ContactMe onNavigate={setActiveSection} />}
    </main>
  );
  */
}