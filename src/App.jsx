import { useEffect, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Mail, Instagram, ArrowRight, BookOpen, Briefcase, Award, Code, ChevronDown } from 'lucide-react';
import './App.css';

// Content Data
const SKILLS = ['HTML', 'Java', 'Python', 'Cyber Security'];

const EXPERIENCE = [
  {
    role: 'Marketing Head',
    company: 'Zynkly',
    link: 'https://www.instagram.com/zynklynow?igsh=bGp5MjVxb3pubzEx',
    description: 'Spearheading marketing campaigns and digital outreach strategies for brand growth.'
  }
];

const ACHIEVEMENTS = [
  {
    title: 'IIT Bombay Short Film Competition',
    position: '3rd Place Winner',
    description: 'Recognized for outstanding creative direction and storytelling.'
  }
];

// Reusable animated section component
const RevealSection = ({ children, className = "" }) => {
  const ref = useRef(null);
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

function App() {
  const { scrollYProgress } = useScroll();
  const opacity = useTransform(scrollYProgress, [0, 0.05], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.1], [1, 0.95]);

  return (
    <div className="app-container">
      {/* Navigation */}
      <nav className="navbar container">
        <div className="logo">RS.</div>
        <div className="nav-links hidden-mobile">
          <a href="#about">About</a>
          <a href="#experience">Experience</a>
          <a href="#skills">Skills</a>
          <a href="#contact">Contact</a>
        </div>
        <a href="#contact" className="nav-cta hidden-mobile">Let's Talk</a>
      </nav>

      {/* Hero Section */}
      <section className="hero-section container">
        <motion.div 
          className="hero-content"
          style={{ opacity, scale }}
        >
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="hero-subtitle"
          >
            B.Tech Student & IT Enthusiast
          </motion.h2>
          
          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.4 }}
            className="display-text hero-title"
          >
            RISHABH<br />
            <span className="outline-text">SRIVASTAVA</span>
          </motion.h1>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="hero-actions"
          >
            <a href="#contact" className="btn-primary">
              Connect <ArrowRight size={20} />
            </a>
            <div className="social-mini">
              <a href="https://www.instagram.com/master_rishabh_01?igsh=Ymk4MWpzNXpmNzU1&utm_source=qr" target="_blank" rel="noreferrer">
                <Instagram size={24} />
              </a>
              <a href="mailto:Masterrishabh369@gmail.com">
                <Mail size={24} />
              </a>
            </div>
          </motion.div>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div 
          className="scroll-indicator"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 1 }}
        >
          <ChevronDown size={32} className="bounce-anim" />
        </motion.div>
      </section>

      {/* About Section */}
      <section id="about" className="section-padding container">
        <RevealSection className="about-grid">
          <div className="about-text">
            <h2 className="section-title">The <br/> Engineer.</h2>
            <p className="body-large">
              Currently pursuing my B.Tech at Lovely Professional University. I am an IT passionate individual with a keen eye for problem-solving. My journey is defined by bridging the gap between deep technical implementation and creative marketing strategies. From writing algorithms to designing campaigns, I thrive in dynamic environments.
            </p>
          </div>
          <div className="about-image">
            <div className="image-placeholder">
              {/* Image getting injected dynamically */}
              <img src="/rishabh image.jpeg" alt="Rishabh Srivastava" className="profile-img fallback-image" onError={(e) => { e.target.src = 'https://images.unsplash.com/photo-1542385262-cea2c1eabde0?q=80&w=2690&auto=format&fit=crop' }} />
            </div>
          </div>
        </RevealSection>
      </section>

      {/* Experience & Achievements Section */}
      <section id="experience" className="section-padding dark-section">
        <div className="container">
          <RevealSection>
            <h2 className="section-title inverted">Journey</h2>
          </RevealSection>
          
          <div className="journey-grid">
            <RevealSection className="journey-col">
              <div className="journey-header">
                <Briefcase size={32} />
                <h3>Experience</h3>
              </div>
              <div className="journey-list">
                {EXPERIENCE.map((exp, idx) => (
                  <div key={idx} className="journey-card hover-lift">
                    <h4 className="journey-role">{exp.role} <span className="highlight">@ {exp.company}</span></h4>
                    <p className="journey-desc">{exp.description}</p>
                    <a href={exp.link} target="_blank" rel="noreferrer" className="explore-link">View Company &rarr;</a>
                  </div>
                ))}
              </div>
            </RevealSection>

            <RevealSection className="journey-col">
              <div className="journey-header">
                <Award size={32} />
                <h3>Achievements</h3>
              </div>
              <div className="journey-list">
                {ACHIEVEMENTS.map((ach, idx) => (
                  <div key={idx} className="journey-card hover-lift">
                    <h4 className="journey-role">{ach.title}</h4>
                    <div className="badge">{ach.position}</div>
                    <p className="journey-desc">{ach.description}</p>
                  </div>
                ))}
              </div>
            </RevealSection>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="section-padding container">
        <RevealSection>
          <h2 className="section-title">Arsenal</h2>
          <div className="skills-container">
            {SKILLS.map((skill, idx) => (
              <motion.div 
                key={idx}
                whileHover={{ scale: 1.05 }}
                className="skill-pill"
              >
                <Code size={20} className="skill-icon" />
                <span>{skill}</span>
              </motion.div>
            ))}
          </div>
        </RevealSection>
      </section>

      {/* Contact Section Minimal */}
      <section id="contact" className="section-padding footer-section">
        <div className="container">
          <RevealSection className="footer-content">
            <h2 className="display-text">LET'S BUILD<br/>SOMETHING<br/><span className="outline-text">GREAT.</span></h2>
            <div className="social-links-huge">
              <a href="https://www.instagram.com/master_rishabh_01?igsh=Ymk4MWpzNXpmNzU1&utm_source=qr" target="_blank" rel="noreferrer" className="social-pill hover-scale">
                <Instagram size={30} />
                <span>Instagram Profile</span>
              </a>
              <a href="mailto:Masterrishabh369@gmail.com" className="social-pill hover-scale">
                <Mail size={30} />
                <span>Masterrishabh369@gmail.com</span>
              </a>
              <a href="https://www.instagram.com/zynklynow?igsh=bGp5MjVxb3pubzEx" target="_blank" rel="noreferrer" className="social-pill hover-scale">
                <Briefcase size={30} />
                <span>Zynkly Network</span>
              </a>
            </div>
            
            <div className="footer-bottom">
              <p>&copy; {new Date().getFullYear()} Rishabh Srivastava. All rights reserved.</p>
            </div>
          </RevealSection>
        </div>
      </section>
    </div>
  );
}

export default App;
