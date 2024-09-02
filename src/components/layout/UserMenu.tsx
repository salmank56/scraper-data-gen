import React from 'react';
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { GearIcon } from '@radix-ui/react-icons';
import { Link } from 'react-router-dom';

const UserMenu: React.FC = () => (
  <DropdownMenu>
    <DropdownMenuTrigger asChild>
      <Button variant="ghost" size="icon" className="rounded-full hover:bg-gray-500">
        <GearIcon className="w-6 h-6 dark:text-white" />
        <span className="sr-only">Open user menu</span>
      </Button>
    </DropdownMenuTrigger>
    <DropdownMenuContent align="end">
      <Link to={"/"} >
      <DropdownMenuLabel className='cursor-pointer dark:hover:bg-gray-500 dark:hover:text-white'>Scraper</DropdownMenuLabel>
      </Link>
      <DropdownMenuSeparator />
      <Link to="data-gen">
      <DropdownMenuLabel className='cursor-pointer dark:hover:bg-gray-500 dark:hover:text-white'>Data-Generation</DropdownMenuLabel>
      </Link>
      <DropdownMenuSeparator />
    </DropdownMenuContent>
  </DropdownMenu>
);

export default UserMenu;