import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Navigation } from './components/Navigation';
import { Footer } from './components/Footer';
import { Home } from './components/Home';
import { Dashboard } from './components/Dashboard';
import { Patients } from './components/Patients';
import { Doctors } from './components/Doctors';
import { Caretakers } from './components/Caretakers';
import { Medicines } from './components/Medicines';
import { Search } from './components/Search';
import { About } from './components/About';
import { Contact } from './components/Contact';
import './App.css';

function App() {
  return (
    <Router>
      <div className="app">
        <Navigation />
        <main className="app-main">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/patients" element={<Patients />} />
            <Route path="/doctors" element={<Doctors />} />
            <Route path="/caretakers" element={<Caretakers />} />
            <Route path="/medicines" element={<Medicines />} />
            <Route path="/search" element={<Search />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;

