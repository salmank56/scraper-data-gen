import React from 'react';
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";
import NavigationLinks from './NavigationLinks';
import { useSidebar } from '@/scraper/hooks/useSidebar';



const MobileSidebar: React.FC = () => {
    const {isOpen, close} = useSidebar();
  return (
    <div className={`fixed inset-0 z-40 md:hidden ${isOpen ? "" : "hidden"}`}>
      <div className="fixed inset-0 bg-gray-600 bg-opacity-75" onClick={close}></div>
      <div className="relative flex flex-col flex-1 w-full max-w-xs bg-white dark:bg-gray-800">
        <div className="absolute top-0 right-0 pt-2 -mr-12">
          <Button variant="ghost" onClick={close}>
            <X className="w-6 h-6 text-white" />
            <span className="sr-only">Close sidebar</span>
          </Button>
        </div>
        <div className="flex-1 h-0 pt-5 pb-4 overflow-y-auto">
          <div className="flex items-center justify-between flex-shrink-0 px-4">
            <span className="text-2xl font-semibold">Your App Name</span>
          </div>
          <nav className="px-2 mt-5 space-y-1">
            <NavigationLinks />
          </nav>
        </div>
      </div>
    </div>
  );
};

export default MobileSidebar;