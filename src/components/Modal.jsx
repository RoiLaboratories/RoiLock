import { useState, useEffect } from 'react';
import { X } from 'lucide-react';

/**
 * Reusable Modal Component
 * 
 * @param {Object} props
 * @param {boolean} props.isOpen - Controls if the modal is visible
 * @param {Function} props.onClose - Function to call when modal is closed
 * @param {string} props.title - Modal title
 * @param {React.ReactNode} props.children - Modal content
 * @param {string} props.className - Additional classes for the modal content
 * @param {boolean} props.showCloseButton - Whether to show the close button (default: true)
 */
const Modal = ({ 
  isOpen, 
  onClose, 
  title, 
  children, 
  className = "",
  showCloseButton = true
}) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setIsVisible(true);
      // Prevent body scrolling when modal is open
      document.body.style.overflow = 'hidden';
    } else {
      // Add a small delay before hiding to allow for animation
      const timer = setTimeout(() => {
        setIsVisible(false);
      }, 200);
      
      // Re-enable body scrolling when modal is closed
      document.body.style.overflow = 'unset';
      
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  if (!isVisible) return null;

  return (
    <div 
      className={`fixed inset-0 z-50 flex items-center justify-center p-4 transition-opacity duration-200 ${
        isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
      }`}
      aria-modal="true"
      role="dialog"
    >
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black backdrop-blur-[4px]"
          style={{ backgroundColor: `rgba(128, 128, 128, 0.3` }} 
        onClick={onClose}
      />
      
      {/* Modal Content */}
      <div 
        className={`relative bg-surface rounded-2xl shadow-lg max-w-md w-full mx-auto transition-all duration-200 transform ${
          isOpen ? 'scale-100 translate-y-0' : 'scale-95 translate-y-4'
        } ${className}`}
      >
        {/* Modal Header */}
        {title && (
          <div className="flex items-center justify-between p-4 border-b border-border">
            <h2 className="text-xl font-semibold text-text">{title}</h2>
            {showCloseButton && (
              <button 
                onClick={onClose}
                className="p-1 rounded-full hover:bg-btnhoverL transition-colors duration-200"
                aria-label="Close modal"
              >
                <X size={20} />
              </button>
            )}
          </div>
        )}
        
        {/* Modal Body */}
        <div className="p-4">
          {children}
        </div>
      </div>
    </div>
  );
};

export default Modal;