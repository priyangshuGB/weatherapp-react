import React from 'react';

export const Cards = ({ children, className = '' }) => {
  return (
    <div className={`bg-white rounded-2xl shadow-xl ${className}`}>
      {children}
    </div>
  );
};

// Updated CardContent component
export function CardContent({ children, className = '' }) {
  // The children prop contains everything passed between <CardContent> and </CardContent>
  // We can add some default padding or other styles here.
  // The className prop allows for additional custom styling from where it's used.
  return (
    <div className={`p-6 ${className}`}> {/* Example: Added padding with 'p-6' */}
      {children}
    </div>
  );
}