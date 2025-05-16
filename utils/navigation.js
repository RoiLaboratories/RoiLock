// navigation.js - Utility file for application navigation

import { getRouteByName } from "../src/layout/Layout";

// import { getRouteByName } from './AppLayout';

/**
 * Navigate to a specific route by name
 * @param {string} routeName - The name of the route to navigate to
 * @param {object} navigate - The navigate function from useNavigate hook
 */
export const navigateToRoute = (routeName, navigate) => {
  const path = getRouteByName(routeName);
  navigate(path);
};

/**
 * Open an external link
 * @param {string} linkKey - The key for the external link
 */
export const openExternalLink = (linkKey) => {
  const externalLinks = {
    'dexscreener': 'https://dexscreener.com',
    'doc': 'https://roi-laboratories.gitbook.io/roilabs',
    'x': 'https://x.com/theroilabs',
    'youtube': 'https://youtube.com/theroilabs',
    'telegram': 'https://t.me/theroilabs'
  };
  
  if (externalLinks[linkKey]) {
    window.open(externalLinks[linkKey], '_blank', 'noopener,noreferrer');
  }
};

/**
 * Check if a given key is an external link
 * @param {string} key - The key to check
 * @returns {boolean} - True if the key corresponds to an external link
 */
export const isExternalLink = (key) => {
  const externalLinkKeys = ['dexscreener', 'doc', 'x', 'youtube', 'telegram'];
  return externalLinkKeys.includes(key);
};