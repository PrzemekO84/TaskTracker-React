import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import { ListTaskProvider } from './context/ListTaskContext';

import Header from './Header';
import Footer from './Footer';
import NotFound from './pages/NotFound';
import Home from './pages/Home';
import Tasks from './pages/Tasks';
import Settings from './pages/Settings';


function App() {
  return (
    <div className="min-h-screen flex flex-col">
      <ListTaskProvider>
        <Router>
          <Header />
          <main className="flex flex-grow">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/Tasks" element={<Tasks />} />
              <Route path="/Settings" element={<Settings />} />
              <Route path="*" element={<NotFound />}>
                {" "}
              </Route>
            </Routes>
          </main>
          <Footer />
        </Router>
      </ListTaskProvider>
    </div>
  );
}

export default App;
