import React from "react";
import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import SearchForm from "./SearchForm";
import { useSidebarStore } from "@/scraper/hooks/useSidebar";
import { Link, useLocation } from "react-router-dom";
import { FaArrowRight } from "react-icons/fa";

const Header: React.FC = () => {
  const toggle = useSidebarStore((state) => state.toggle);
  const location = useLocation();
  return (
    <header className="fixed top-0 z-30 w-full border-b border-gray-200 dark:bg-gray-800 dark:border-gray-700">
      <div className="px-3 py-3 lg:px-5 lg:pl-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center justify-start">
            <Button
              variant="outline"
              size="icon"
              className="sm:hidden"
              onClick={toggle}
            >
              <Menu className="w-5 h-5" />
              <span className="sr-only">Toggle sidebar</span>
            </Button>
            <SearchForm />
          </div>
          <div>
            {location.pathname.startsWith("/data-gen") ? (
              <Link
                to="/scraper"
                className="flex items-center gap-2 font-semibold"
              >
                <Button className="bg-teal-600 hover:bg-teal-700">
                  <span className="uppercase">Ai-Scraper</span>
                  <FaArrowRight />
                </Button>
              </Link>
            ) : (
              <Link
                to="/data-gen"
                className="flex items-center gap-2 font-semibold text-center"
              >
                <Button className="bg-teal-600 hover:bg-teal-700">
                  <span className="uppercase">Data-Generation</span>
                  <FaArrowRight />
                </Button>
              </Link>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
