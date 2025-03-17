import React from 'react';

function Header({ title }) {

  
  return (
    <header className="bg-sky-200 bg-opacity-50 backdrop-blur-md shadow-lg border-b border-gray-700 dark:bg-gray-900 dark:text-gray-200">
      <div className="max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8">
        <h1 className="text-2xl font-semibold">{title}</h1>
      </div>
    </header>
  );
}

export default Header;
