import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { Home } from './pages/Home';
import { CropRecommendation } from './pages/CropRecommendation';
import { YieldPrediction } from './pages/YieldPrediction';
import { FertilizerGuide } from './pages/FertilizerGuide';
import { DiseaseDetection } from './pages/DiseaseDetection';
import { ThemeProvider } from './context/ThemeContext';

function App() {
  return (
    <ThemeProvider>
      <Router>
        <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-green-50 dark:from-slate-900 dark:via-slate-800 dark:to-emerald-950 transition-colors duration-200">
          <Navbar />
          <main className="pt-16">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/crop-recommendation" element={<CropRecommendation />} />
              <Route path="/yield-prediction" element={<YieldPrediction />} />
              <Route path="/fertilizer-guide" element={<FertilizerGuide />} />
              <Route path="/disease-detection" element={<DiseaseDetection />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </Router>
    </ThemeProvider>
  );
}

export default App;