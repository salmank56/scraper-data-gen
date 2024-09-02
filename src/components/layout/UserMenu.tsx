import React from 'react';
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { GearIcon, SwitchIcon } from '@radix-ui/react-icons';
import { Link } from 'react-router-dom';

const UserMenu: React.FC = () => (
  <DropdownMenu>
    <DropdownMenuTrigger asChild>
      <Button variant="ghost" size="icon" className="rounded-full hover:bg-gray-500">
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