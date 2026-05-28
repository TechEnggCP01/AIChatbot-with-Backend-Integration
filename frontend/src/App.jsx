import React, { useState, useEffect } from 'react';
import Sidebar from './components/Sidebar';
import ChatArea from './components/ChatArea';
import Login from './Login';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const [isMobileOpen, setMobileOpen] = useState(false);
  const [isDark, setIsDark] = useState(true);

  // Initialize theme
  useEffect(() => {
    // Check local storage or system preference
    const savedTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    if (savedTheme === 'dark' || (!savedTheme && prefersDark)) {
      setIsDark(true);
      document.documentElement.classList.add('dark');
    } else {
      setIsDark(false);
      document.documentElement.classList.remove('dark');
    }
    
    // Check auth
    const token = localStorage.getItem('token');
    if (token) {
      setIsAuthenticated(true);
      setUser({ email: 'user@example.com' }); // Mock user
    }
  }, []);

  const toggleTheme = () => {
    setIsDark(!isDark);
    if (!isDark) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  };

  const handleLogin = (userData) => {
    setUser(userData);
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    setUser(null);
    setIsAuthenticated(false);
  };

  if (!isAuthenticated) {
    return <Login onLogin={handleLogin} />;
  }

  // Mock history
  const history = [
    { id: 1, title: 'React Hooks explanation' },
    { id: 2, title: 'Tailwind CSS setup' },
    { id: 3, title: 'How to make a REST API' },
  ];

  return (
    <div className="flex h-screen bg-white dark:bg-chat-dark text-gray-900 dark:text-gray-100 font-sans transition-colors duration-200 overflow-hidden">
      <Sidebar 
        isMobileOpen={isMobileOpen} 
        setMobileOpen={setMobileOpen} 
        toggleTheme={toggleTheme}
        isDark={isDark}
        history={history}
        onLogout={handleLogout}
      />
      <ChatArea setMobileOpen={setMobileOpen} />
    </div>
  );
}

export default App;
