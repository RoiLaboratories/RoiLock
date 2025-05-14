import { useState, useEffect } from 'react';

// Number Counter Component
export default function NumberCounter({ value, prefix = '', suffix = '', duration = 2000 }){
  const [count, setCount] = useState(0);
  
  useEffect(() => {
    // Convert string values like "1.6k" to numbers for animation
    let targetValue = value;
    if (typeof value === 'string') {
      // Handle "k" suffix
      if (value.toLowerCase().includes('k')) {
        targetValue = parseFloat(value.toLowerCase().replace('k', ''));
      } else {
        targetValue = parseFloat(value);
      }
    }
    
    // Ensure we have a valid number
    if (isNaN(targetValue)) {
      targetValue = 0;
    }
    
    // Calculate animation steps
    const steps = 50;
    const increment = targetValue / steps;
    const stepTime = duration / steps;
    let currentCount = 0;
    
    // Animate the counter
    const timer = setInterval(() => {
      currentCount += increment;
      if (currentCount >= targetValue) {
        clearInterval(timer);
        setCount(targetValue);
      } else {
        setCount(currentCount);
      }
    }, stepTime);
    
    return () => clearInterval(timer);
  }, [value, duration]);
  
  // Format count for display
  const formattedCount = () => {
    if (typeof value === 'string' && value.toLowerCase().includes('k')) {
      return `${prefix}${count.toFixed(1)}k${suffix}`;
    } else if (typeof value === 'string' && value.startsWith('$')) {
      return `$${count.toFixed(1)}k${suffix}`;
    }
    return `${prefix}${count.toFixed(0)}${suffix}`;
  };
  
  return <span className="font-bold">{formattedCount()}</span>;
};
