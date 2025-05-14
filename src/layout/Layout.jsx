import { useState } from 'react';
import Sidebar from './Sidebar';
import Header from './Header';
import Home from '../pages/Home';

// Import potential content components
// import BasicLock from './content/BasicLock';
// import PremiumLock from './content/PremiumLock';
// import CustomLock from './content/CustomLock';
// import DexScreener from './content/DexScreener';
// import Rewards from './content/Rewards';
// import Support from './content/Support';
// import ThemeSettings from './content/ThemeSettings';

export default function AppLayout() {
  const [content, setContent] = useState('home');
  
  // Content configuration with external links and component mapping
  const contentMap = {
    'home': { 
      component: Home,
      isExternal: false
    },
    // 'lock-basic': {
    //   component: BasicLock,
    //   isExternal: false
    // },
    // 'lock-premium': {
    //   component: PremiumLock,
    //   isExternal: false
    // },
    // 'lock-custom': {
    //   component: CustomLock,
    //   isExternal: false
    // },
    // 'dexscreener': {
    //   component: DexScreener,
    //   isExternal: false
    // },
    // 'rewards': {
    //   component: Rewards,
    //   isExternal: false
    // },
    // 'support': {
    //   component: Support,
    //   isExternal: false
    // },
    'doc': {
      url: 'https://roi-laboratories.gitbook.io/roilabs',
      isExternal: true
    },
    'x': {
      url: 'https://x.com/theroilabs',
      isExternal: true
    },
    'youtube': {
      url: 'https://youtube.com/theroilabs',
      isExternal: true
    },
    'telegram': {
      url: 'https://t.me/theroilabs',
      isExternal: true
    },
    // 'theme': {
    //   component: ThemeSettings,
    //   isExternal: false
    // }
  };
  
  // Handle external links
  const handleContentSelect = (contentKey) => {
    const selectedContent = contentMap[contentKey];
    
    if (selectedContent && selectedContent.isExternal) {
      // Open external link in new tab
      window.open(selectedContent.url, '_blank', 'noopener,noreferrer');
    } else {
      // Set internal content
      setContent(contentKey);
    }
  };
  
  const currentContent = contentMap[content] || contentMap.home;
  const ContentComponent = currentContent.component || null;

  return (
    <div className="flex h-screen bg-background">
      {/* Sidebar - Full height, starts from top */}
      {/* <div className="h-full shrink-0-md"> */}
        <Sidebar onSelect={handleContentSelect} />
      {/* </div> */}
      
      {/* Main content area with header */}
      <div className="flex flex-col overflow-hidden">
        {/* Header - Fixed at top of content area */}
        <Header />
        
        {/* Scrollable content area */}
        <div className="flex flex-col overflow-y-auto p-0">
          {/* Render the appropriate component */}
          {ContentComponent && (
            <div className="p-0 flex flex-col items-center justify-center">
              <ContentComponent />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}