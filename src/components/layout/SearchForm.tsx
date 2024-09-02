import React from 'react';
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";

const SearchForm: React.FC = () => (
    <form className="hidden sm:block sm:pl-3">
      <div className="relative mt-1 rounded-md shadow-sm">
        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
          <Search className="w-4 h-4 text-gray-400" aria-hidden="true" />
        </div>
        <Input
          type="text"
          name="search"
          id="search"
          className="block w-full rounded-md border-0 py-1.5 pl-10 ring-1 ring-inset focus:ring-2 focus:ring-inset sm:text-sm sm:leading-6"
          placeholder="Search"
        />
      </div>
    </form>
  );

  export default SearchForm