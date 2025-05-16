import React from 'react';

/**
 * Reusable Button Component
 * 
 * @param {Object} props
 * @param {React.ReactNode} props.children - Button content
 * @param {string} props.variant - Button style variant (default, primary, outlined, connect)
 * @param {React.ReactNode} props.icon - Optional icon to display before text
 * @param {Function} props.onClick - Click handler function
 * @param {string} props.className - Additional CSS classes
 * @param {string} props.size - Button size (sm, md, lg)
 * @param {boolean} props.fullWidth - Whether button should take full width
 * @param {boolean} props.disabled - Whether button is disabled
 */
export default function Button({ 
  children, 
  variant = 'default', 
  icon, 
  onClick, 
  className = '',
  size = 'md',
  fullWidth = false,
  disabled = false,
  
}) {
  const variantClasses = {
    default: 'bg-gray-100 hover:bg-gray-200 text-sm text-gray-800 dark:bg-gray-800 dark:hover:bg-gray-700 dark:text-gray-200',
    primary: 'bg-[var(--color-primary)] text-sm hover:bg-[var(--color-primary)]/90 text-white',
    outlined: 'bg-transparent text-sm border border-3-[var(--color-text)] text-[var(--color-text)] hover:bg-[var(--color-btnhoverL)] ',
    connect: 'bg-[var(--color-primary)] text-sm hover:bg-[#E05416] text-white ',
    danger: 'bg-red-500 hover:bg-red-600 text-sm text-white',
    success: 'bg-green-500 hover:bg-green-600 text-sm text-white'
  };

  const sizeClasses = {
    sm: 'px-2 py-1 text-sm',
    md: 'px-4 py-2',
    lg: 'px-6 py-3 text-lg'
  };

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`
        rounded-md transition-colors flex items-center gap-2 font-medium
        ${variantClasses[variant] || variantClasses.default}
        ${sizeClasses[size] || sizeClasses.md}
        ${fullWidth ? 'w-full justify-center' : ''}
        ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
        ${className}
      `}
    >
      {icon && <span className="flex-shrink-0">{icon}</span>}
      {children}
    </button>
  );
}