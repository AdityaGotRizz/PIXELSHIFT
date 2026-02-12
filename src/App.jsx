import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import useCanvasCursor from './hooks/useCanvasCursor';

import Navbar from './components/layout/Navbar';
import Footer from './sections/Footer';
import Home from './pages/Home';
import Work from './pages/Work';
import BlogIndex from './pages/BlogIndex';
import BlogPost from './pages/BlogPost';

import PrivacyPolicy from './pages/PrivacyPolicyTest';
import TermsOfService from './pages/TermsOfService';

// Inline test component
// const PrivacyPolicy = () => {
//   return (
//     <div style={{ padding: 100, color: 'blue' }}>
//       <h1>Inline Component Test</h1>
//       <p>If you see this, the import path was broken.</p>
//     </div>
//   );
// };

const AnimatedRoutes = () => {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<Home />} />
        <Route path="/work" element={<Work />} />
        <Route path="/blog" element={<BlogIndex />} />
        <Route path="/blog/:id" element={<BlogPost />} />
        <Route path="/privacy" element={<PrivacyPolicy />} />
        <Route path="/terms" element={<TermsOfService />} />
      </Routes>
    </AnimatePresence>
  );
};

function App() {
  useCanvasCursor();

  return (
    <Router>
      <div className="min-h-screen bg-dark-900 text-white selection:bg-primary/30 relative overflow-x-hidden">
        <canvas id="canvas" className="fixed top-0 left-0 w-full h-full pointer-events-none z-50 mix-blend-screen" />
        <Navbar />
        <main className="relative z-10">
          <AnimatedRoutes />
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
