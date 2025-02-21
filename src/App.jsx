import React from 'react';
import { BrowserRouter, Routes, Route, useNavigate, Link } from 'react-router-dom';
import './App.css';
import SleepTracker from './components/SleepTracker';
import VitaminStore from "./components/VitaminStore"; 
import HealthProfile from "./components/HealthProfile"; 
import DoctorAccess from './components/DoctorAccess';
const Header = () => (
  <header className="header">
    Heal Link - Your Personalized Healthcare Solution
  </header>
);

const Navigation = () => (
  <nav className="navigation">
    <div className="logo">
      <Link to="/" style={{ color: 'white', textDecoration: 'none' }}>Heal Link</Link>
    </div>
    <ul className="nav-links">
      <li><a href="#profile">Profile</a></li>
      <li><a href="#sleep-tracker">Sleep Tracker</a></li>
      <li><a href="#providers">Doctors</a></li>
      <li><a href="#vitamin-marketplace">Vitamin Marketplace</a></li>
    </ul>
    <button className="consult-btn">Consult Now</button>
  </nav>
);

const Hero = () => {
  const navigate = useNavigate();
  
  return (
    <div className="hero">
      <div className="hero-background">
      <iframe 
            src="https://www.youtube.com/embed/wEyiqO9qg2s?autoplay=1&mute=1&loop=1&playlist=wEyiqO9qg2s&controls=0&showinfo=0&modestbranding=1"
            frameborder="0"
            allow="autoplay; encrypted-media"
            allowfullscreen>
        </iframe>
      </div>
      <div className="hero-overlay">
        <h1>Your Health, Your Way</h1>
        <p>Experience a revolution in personalized healthcare with AI-driven insights and tailored wellness solutions.</p>
        <button className="get-started" onClick={() => navigate('/vitamin-store')}>
          Get Started
        </button>
        
      </div>
    </div>
  );
};

const Section = ({ id, title, description, navigate }) => (
  <section id={id} className="section">
    <h2>{title}</h2>
    <p>{description}</p>
    {id === 'sleep-tracker' && (
      <button className="enroll-btn" onClick={() => navigate('/sleep-tracker')}>
        Enroll Now
      </button>
    )}
    {id === 'vitamin-marketplace' && (
      <button className="enroll-btn" onClick={() => navigate('/vitamin-store')}>
        Enroll Now
      </button>
    )}
    {id === 'profile' && (
      <button className="enroll-btn" onClick={() => navigate('/profile')}>
        Enroll Now
      </button>
    )}
    {id === 'providers' && (
      <button className="enroll-btn" onClick={() => navigate('/providers')}>
        Enroll Now
      </button>
    )}
    {!['sleep-tracker', 'vitamin-marketplace','profile','providers'].includes(id) && (
      <button className="enroll-btn">Enroll Now</button>
    )}
  </section>
);

 

const Footer = () => (
  <footer className="footer">
    <p>&copy; 2025 Heal Link. All Rights Reserved.</p>
  </footer>
);

// Wrap HomePage in a component to use useNavigate hook
const HomePageWrapper = () => {
  const navigate = useNavigate();
  
  const sections = [
    {
      id: 'profile',
      title: 'Create Your Personalized Health Profile',
      description: 'Take control of your well-being with a tailored health experience.'
    },
    {
      id: 'providers',
      title: 'Doctor & Healthcare Provider Access',
      description: 'Securely message doctors, schedule appointments, and manage prescriptions.'
    },
    {
      id: 'sleep-tracker',
      title: 'Sleep Tracking',
      description: 'Monitor your sleep patterns and receive personalized insights for better rest.'
    },
    {
      id: 'vitamin-marketplace',
      title: 'Vitamin Supplement Marketplace',
      description: 'Find the best vitamin supplements tailored to your health needs.'
    }
  ];

  return (
    <>
      <Header />
      <Navigation />
      <Hero />
      {sections.map(section => (
        <Section key={section.id} {...section} navigate={navigate} />
      ))}
      <Footer />
    </>
  );
};

// SleepTracker page component
const SleepTrackerPage = () => (
  <div className="app">
    <Header />

    <div className="content-wrapper">
      <SleepTracker />
    </div>
    <Footer />
  </div>
);

const VitaminStorePage = () => (
  <div className="app">
    <Header />

    <div className="content-wrapper">
      <VitaminStore/>
    </div>
    <Footer />
  </div>
);

const HealthProfilePage= () => (
  <div className="app">
    <Header />

    <div className="content-wrapper">
      <HealthProfile />
    </div>
    <Footer />
  </div>
);

const DoctorAccessPage = () => (
  <div className="app">
    <Header />

    <div className="content-wrapper">
      <DoctorAccess/>
    </div>
    <Footer />
  </div>
);


// Main App component
const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePageWrapper />} />
        <Route path="/sleep-tracker" element={<SleepTrackerPage />} />
        <Route path="/vitamin-store" element={<VitaminStorePage />} />
        <Route path="/profile" element={<HealthProfilePage />} />
        <Route path="/providers" element={<DoctorAccessPage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;