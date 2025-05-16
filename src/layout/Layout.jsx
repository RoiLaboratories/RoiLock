import {  useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useNavigate, useLocation } from 'react-router-dom';
import Sidebar from './Sidebar';
import Header from './Header';
import Home from '../pages/Home';
import CreateLockHolder from '../pages/CreateLock';

// Page components
const CreateLock = () => <CreateLockHolder/>;
const TokenLock = () => <div>Token Lock Content</div>;
const LiquidityLock = () => <div>Liquidity Lock Content</div>;
const Rewards = () => <div>Rewards Content</div>;
const Support = () => <div>Support Content</div>;
const ThemeSettings = () => <div>Theme Settings</div>;

// External links configuration
const externalLinks = {
  'dexscreener': 'https://dexscreener.com',
  'doc': 'https://roi-laboratories.gitbook.io/roilabs',
  'x': 'https://x.com/theroilabs',
  'youtube': 'https://youtube.com/theroilabs',
  'telegram': 'https://t.me/theroilabs'
};

// Route configuration with metadata
const routes = {
  '/': { name: 'home', component: Home },
  '/create-lock': { name: 'create-lock', component: CreateLock, parent: 'roilock' },
  '/token-lock': { name: 'token-lock', component: TokenLock, parent: 'roilock' },
  '/liquidity-lock': { name: 'liquidity-lock', component: LiquidityLock, parent: 'roilock' },
  '/rewards': { name: 'rewards', component: Rewards },
  '/support': { name: 'support', component: Support },
  '/theme': { name: 'theme', component: ThemeSettings }
};

// Helper function to get route path by name
export const getRouteByName = (routeName) => {
  for (const [path, config] of Object.entries(routes)) {
    if (config.name === routeName) {
      return path;
    }
  }
  return '/'; // Default to home if route name not found
};

// Main content area with routing
const MainContent = () => {
  const location = useLocation();
  
  useEffect(() => {
    // Scroll to top when route changes
    window.scrollTo(0, 0);
  }, [location]);

  return (
    <div className="flex flex-col overflow-hidden w-full">
      <Header />
      <div className="flex flex-col overflow-y-auto scrollbar-hide  w-full">
        <Routes>
          {Object.entries(routes).map(([path, { component: Component }]) => (
            <Route key={path} path={path} element={<Component />} />
          ))}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </div>
    </div>
  );
};

// Sidebar with navigation
const SidebarWithNavigation = () => {
  const navigate = useNavigate();
  
  const handleNavigation = (contentKey) => {
    // Check if it's an external link
    if (externalLinks[contentKey]) {
      window.open(externalLinks[contentKey], '_blank', 'noopener,noreferrer');
      return;
    }
    
    // For internal routes, navigate to the corresponding path
    const routePath = getRouteByName(contentKey);
    navigate(routePath);
  };
  
  return <Sidebar onSelect={handleNavigation} />;
};

export default function AppLayout() {
  return (
    <Router>
      <div className="flex h-screen bg-background">
        <SidebarWithNavigation />
        <MainContent />
      </div>
    </Router>
  );
}