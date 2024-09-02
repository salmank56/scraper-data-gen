import React from 'react';
import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import SearchForm from './SearchForm';
import { useSidebarStore } from '@/scraper/hooks/useSidebar';
import UserMenu from './UserMenu';

const Header: React.FC = () => {
  const toggle = useSidebarStore((state) => state.toggle);
  return (
  <header className="fixed top-0 z-30 w-full border-b border-gray-200 dark:bg-gray-800 dark:border-gray-700">
    <div className="px-3 py-3 lg:px-5 lg:pl-3">
      <div className="flex items-center justify-between">
        <div className="flex items-center justify-start">
          <Button variant="outline" size="icon" className="sm:hidden" onClick={toggle}>
            <Menu className="w-5 h-5" />
            <span className="sr-only">Toggle sidebar</span>
          </Button>
          <SearchForm />
        </div>
        <UserMenu />
      </div>
    </div>
  </header>
)};

export default Header;