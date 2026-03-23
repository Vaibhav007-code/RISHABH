import { useEffect, useRef, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Mail, Instagram, ArrowRight, BookOpen, Briefcase, Award, Code, ChevronDown, Download, X } from 'lucide-react';
import './App.css';

// Device detection hook
const useDeviceDetect = () => {
  const [deviceInfo, setDeviceInfo] = useState({
    isMobile: false,
    isTablet: false,
    isDesktop: false
  });

  useEffect(() => {
    const checkDevice = () => {
      const width = window.innerWidth;
      setDeviceInfo({
        isMobile: width <= 768,
        isTablet: width > 768 && width <= 1024,
        isDesktop: width > 1024
      });
    };

    checkDevice();
    window.addEventListener('resize', checkDevice);
    return () => window.removeEventListener('resize', checkDevice);
  }, []);

  return deviceInfo;
};

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
  const [isResumeModalOpen, setIsResumeModalOpen] = useState(false);
  const { isMobile, isTablet, isDesktop } = useDeviceDetect();

  const handleResumeClick = () => {
    setIsResumeModalOpen(true);
    
    // Request fullscreen based on device type
    if (isDesktop) {
      // For desktop, we'll use the modal which already feels like fullscreen
      setTimeout(() => {
        const modal = document.querySelector('.resume-modal-content');
        if (modal && modal.requestFullscreen) {
          modal.requestFullscreen().catch(err => {
            console.log('Fullscreen not supported or denied:', err);
          });
        }
      }, 100);
    } else if (isMobile || isTablet) {
      // For mobile/tablet, use device's native fullscreen
      setTimeout(() => {
        const modal = document.querySelector('.resume-modal-overlay');
        if (modal && modal.requestFullscreen) {
          modal.requestFullscreen().catch(err => {
            console.log('Fullscreen not supported or denied:', err);
          });
        }
      }, 100);
    }
  };

  return (
    <div className="app-container">
      {/* Navigation */}
      <nav className="navbar container">
        <div className="logo">RS.</div>
        <div className="nav-links hidden-mobile">
          <a href="#about">About</a>
          <a href="#experience">Experience</a>
          <a href="#skills">Skills</a>
          <a href="#resume" onClick={(e) => { e.preventDefault(); handleResumeClick(); }}>Resume</a>
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

      {/* Resume Section */}
      <section id="resume" className="section-padding container">
        <RevealSection>
          <h2 className="section-title">Resume</h2>
          <div className="resume-container">
            <div className="resume-preview" onClick={handleResumeClick}>
              <div className="resume-preview-overlay">
                <Download size={24} />
                <span>{isDesktop ? 'Click to view full resume' : 'Tap to view full resume'}</span>
              </div>
              <div className="resume-thumbnail-custom">
                <div className="resume-paper">
                  <div className="resume-header">
                    <h4 className="resume-name">RISHABH SRIVASTAVA</h4>
                    <p className="resume-contact">B.Tech Student | IT Enthusiast | LPU</p>
                    <p className="resume-email">📧 Masterrishabh369@gmail.com</p>
                  </div>
                  
                  <div className="resume-section">
                    <div className="section-title">ABOUT</div>
                    <div className="section-text">
                      Passionate IT professional with expertise in technical implementation and marketing strategies.
                    </div>
                  </div>
                  
                  <div className="resume-section">
                    <div className="section-title">EXPERIENCE</div>
                    <div className="section-text">
                      <strong>Marketing Head</strong> @ Zynkly
                    </div>
                  </div>
                  
                  <div className="resume-section">
                    <div className="section-title">SKILLS</div>
                    <div className="skills-mini">
                      <span className="skill-pill-mini">HTML</span>
                      <span className="skill-pill-mini">Java</span>
                      <span className="skill-pill-mini">Python</span>
                      <span className="skill-pill-mini">Cyber Security</span>
                    </div>
                  </div>
                  
                  <div className="resume-section">
                    <div className="section-title">EDUCATION</div>
                    <div className="section-text">
                      B.Tech IT at Lovely Professional University
                    </div>
                  </div>
                  
                  <div className="click-indicator">
                    <Download size={24} />
                    <span>Click to View Full Resume</span>
                  </div>
                </div>
              </div>
              
              {/* Centered Bold Capital Text Overlay */}
              <div className="centered-click-text">
                <span className="click-text-main">CLICK TO</span>
                <span className="click-text-outline">OPEN</span>
              </div>
            </div>
            <div className="resume-info">
              <h3>My Professional Journey</h3>
              <p>{isDesktop ? 'Click on the resume preview to view my complete professional background in full-screen mode. You can also download it for future reference.' : 'Tap the resume preview to view my complete professional background. You can also download it for future reference.'}</p>
              <button 
                className="btn-primary" 
                onClick={handleResumeClick}
              >
                View Full Resume <ArrowRight size={20} />
              </button>
            </div>
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

      {/* Resume Modal */}
      {isResumeModalOpen && (
        <motion.div 
          className="resume-modal-overlay"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setIsResumeModalOpen(false)}
        >
          <motion.div 
            className="resume-modal-content"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="resume-modal-header">
              <h3>My Resume</h3>
              <button 
                className="modal-close-btn"
                onClick={() => setIsResumeModalOpen(false)}
              >
                <X size={24} />
              </button>
            </div>
            <div className="resume-modal-body">
              <iframe
                src="/rishabh_srivastav_resume.pdf#view=FitH"
                className="resume-iframe"
                title="Resume"
                width="100%"
                height="100%"
              />
            </div>
            <div className="resume-modal-footer">
              <a 
                href="/rishabh_srivastav_resume.pdf" 
                download="rishabh_srivastav_resume.pdf"
                className="btn-primary"
              >
                <Download size={20} />
                Download Resume
              </a>
            </div>
          </motion.div>
        </motion.div>
      )}
    </div>
  );
}

export default App;
