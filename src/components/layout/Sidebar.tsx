import React from 'react';
import { Link, useLocation } from "react-router-dom";
import NavigationLinks from './NavigationLinks';

const Sidebar: React.FC = () =>{ 
  const location = useLocation();
  return(
  <div className="fixed top-0 left-0 z-40 w-64 h-screen transition-transform -translate-x-full sm:translate-x-0">
    <div className="h-full px-3 py-4 overflow-y-auto bg-gray-50 dark:bg-gray-800">
      <div className="flex items-center justify-between mb-12">
       {location.pathname.startsWith("/scraper") ? (
         <Link to="/scraper" className="flex items-center gap-2 font-semibold">
         <span className="uppercase dark:text-white">Ai-Scraper</span>
       </Link>
       ): (
        <Link to="/data-gen" className="flex items-center gap-2 font-semibold text-center">
        <span className="uppercase dark:text-white">Data-Generation</span>
      </Link>
       )}
      </div>
      <NavigationLinks />
    </div>
  </div>
)};

export default Sidebar;