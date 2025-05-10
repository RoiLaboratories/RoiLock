import { useState } from 'react';
import Sidebar from './Sidebar';
import Header from './Header';

export default function AppLayout() {
  const [content, setContent] = useState('home');
  
  const contentMap = {
    'home': { 
      title: 'Welcome to RoiLock Dashboard',
      description: 'This is your home dashboard where you can see an overview of your locked assets and rewards.'
    },
    'lock-basic': {
      title: 'Basic Lock Options',
      description: 'Configure your basic token locking settings with standard timeframes and rewards.'
    },
    'lock-premium': {
      title: 'Premium Lock Features',
      description: 'Access premium locking features with enhanced APY and special benefits.'
    },
    'lock-custom': {
      title: 'Custom Lock Configuration',
      description: 'Create customized locking strategies tailored to your specific needs and goals.'
    },
    'dexscreener': {
      title: 'Dexscreener Integration',
      description: 'Monitor your tokens and market performance through our Dexscreener integration.'
    },
    'rewards': {
      title: 'Your Rewards',
      description: 'View and claim your earned rewards from locking your tokens.'
    },
    'support': {
      title: 'Support Center',
      description: 'Get help with any issues or questions about using RoiLock.'
    },
    'doc': {
      title: 'Documentation',
      description: 'Comprehensive guides and documentation for all RoiLock features.'
    },
    'x': {
      title: 'X Community',
      description: 'Connect with our X community for updates, discussions, and support.'
    },
    'youtube': {
      title: 'YouTube Community',
      description: 'Connect with our YouTube community for updates, discussions, and support.'
    },
    'telegram': {
      title: 'Telegram Community',
      description: 'Connect with our Telegram community for updates, discussions, and support.'
    },
    'theme': {
      title: 'Theme Settings',
      description: 'Customize your visual experience with theme options.'
    }
  };
  
  const currentContent = contentMap[content] || contentMap.home;

  return (
    <div className="flex h-screen bg-background">
      {/* Sidebar - Full height, starts from top */}
      <div className="flex-shrink-0 h-full">
        <Sidebar onSelect={setContent} />
      </div>
      
      {/* Main content area with header */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header - Fixed at top of content area */}
        <Header />
        
        {/* Scrollable content area */}
        <div className="flex-1 overflow-y-auto p-4 md:p-8">
          <h1 className="text-2xl font-bold mb-4">{currentContent.title}</h1>
          
          <div className="surface p-6 rounded-lg shadow-md border border-[var(--color-border)]">
            <p>{currentContent.description}</p>
            {/* Additional content based on selection would go here */}
          </div>
          
          {/* Demo placeholder content to show scrolling */}
          <div className="mt-6 space-y-6">
            {[1, 2, 3].map(item => (
              <div key={item} className="surface p-6 rounded-lg shadow-md border border-[var(--color-border)]">
                <h2 className="text-xl font-semibold mb-2">Section {item}</h2>
                <p>Additional content for testing scrolling behavior.</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}