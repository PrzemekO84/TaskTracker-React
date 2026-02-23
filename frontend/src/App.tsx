import { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import { ListTaskProvider } from "./context/ListTaskContext";
import { ThemeContextProvider } from "./context/ThemeContext";
import { UserContextProvider } from "./context/UserContext";

import Header from "./Header";
import Footer from "./Footer";
import NotFound from "./pages/NotFound";
import Home from "./pages/Home";
import Tasks from "./pages/Tasks";
import Settings from "./pages/Settings";
import DirectTasks from "./pages/DirectTasks";
import Login from "./pages/Login";
import Singup from "./pages/Signup";
import Appearance from "./pages/Appearance";
import ProfileSettings from "./pages/ProfileSettings";
import ProfileStats from "./pages/ProfileStats";

function App() {
  return (
    <div className="min-h-screen flex flex-col">
      <ListTaskProvider>
        <UserContextProvider>
          <ThemeContextProvider>
            <Router>
              <Header />
              <main className="flex flex-grow">
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/Tasks" element={<Tasks />} />
                  <Route path="/Settings" element={<Settings />}>
                    <Route path="Appearance" element={<Appearance />} />
                    <Route index element={<ProfileSettings />} />
                    <Route
                      path="ProfileSettings"
                      element={<ProfileSettings />}
                    />
                    <Route path="Stats" element={<ProfileStats />} />
                  </Route>

                  <Route
                    path="/DirectTasks/:listId"
                    element={<DirectTasks />}
                  />
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
        </UserContextProvider>
      </ListTaskProvider>
    </div>
  );
}

export default App;
