import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import { ListTaskProvider } from './context/ListTaskContext';
import { ThemeContextProvider } from './context/ThemeContext';

import Header from './Header';
import Footer from './Footer';
import NotFound from './pages/NotFound';
import Home from './pages/Home';
import Tasks from './pages/Tasks';
import Settings from './pages/Settings';
import DirectTasks from './pages/DirectTasks';
import Login from './pages/Login';
import Singup from './pages/Signup';


function App() {
  return (
    <div className="min-h-screen flex flex-col">
      <ListTaskProvider>
        <ThemeContextProvider>
          <Router>
            <Header />
            <main className="flex flex-grow">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/Tasks" element={<Tasks />} />
                <Route path="/Settings" element={<Settings />}>
                  <Route path='Appearence' element={<Home />}/>
                  <Route index element={<Home />}/>
                  <Route path='Stats' element={<Home />}/>
                </Route>
                
                <Route path="/DirectTasks/:listId" element={<DirectTasks />} />
                <Route path="/Login" element={<Login />} />
                <Route path="/Signup" element={<Singup />} />
                <Route path="*" element={<NotFound />}>
                  {" "}
                </Route>
              </Routes>
            </main>
            <Footer />
          </Router>
        </ThemeContextProvider>
      </ListTaskProvider>
    </div>
    
  );
}

export default App;
