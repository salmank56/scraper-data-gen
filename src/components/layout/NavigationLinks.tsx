// import React from 'react';
// import { NavLink } from "react-router-dom";
// import { DashboardIcon, InputIcon } from '@radix-ui/react-icons';

// interface NavLinkProps {
//   link: string;
//   icon: React.ReactNode;
//   text: string;
// }


// const navLinks = [
//   { name: "Home", href: "/scraper", icon: <DashboardIcon className='w-5 h-5' /> },
//   {
//     name: "Edit Taxonomy",
//     href: "scraper/edit-taxonomy",
//     icon: <InputIcon className='w-5 h-5' />,
//   },
// ]


// const NavigationLinks: React.FC = () => (
//   <nav>
//     {navLinks.map((link) => (
//       <NavItem key={link.name} link={link.href} icon={link.icon} text={link.name} />
//     ))}
//   </nav>
// );

// const NavItem: React.FC<NavLinkProps> = ({ link, icon, text }) => (
//   <NavLink
//     to={link}
//     className={({ isActive }) =>
//       `flex items-center p-2 text-base font-normal rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 ${
//         isActive ? 'bg-gray-100 dark:bg-gray-700' : ''
//       }`
//     }
//   >
//     {icon}
//     <span className="ml-3">{text}</span>
//   </NavLink>
// );

// export default NavigationLinks;

import React from 'react';
import { NavLink, useLocation } from "react-router-dom";
import { DashboardIcon, GearIcon, InputIcon } from '@radix-ui/react-icons';

interface NavLinkProps {
  link: string;
  icon: React.ReactNode;
  text: string;
}

const scraperNavLinks = [
  { name: "Home", href: "/scraper", icon: <DashboardIcon className='w-5 h-5' /> },
  {
    name: "Edit Taxonomy",
    href: "/scraper/edit-taxonomy",
    icon: <InputIcon className='w-5 h-5' />,
  },
];

const dataGenNavLinks = [
  { name: "Dashboard", href: "/data-gen", icon: <DashboardIcon className='w-5 h-5' /> },
  {
    name: "Edit Inputs",
    href: "/data-gen/edit-inputs",
    icon: <GearIcon className='w-5 h-5' />,
  },
];

const NavigationLinks: React.FC = () => {
  const location = useLocation();
  const navLinks = location.pathname.startsWith("/scraper") ? scraperNavLinks : dataGenNavLinks;

  return (
    <nav className='space-y-2'>
      {navLinks.map((link) => (
        <NavItem key={link.name} link={link.href} icon={link.icon} text={link.name} />
      ))}
    </nav>
  );
};

const NavItem: React.FC<NavLinkProps> = ({ link, icon, text }) => (
  <NavLink
    to={link}
    className={({ isActive }) =>
      `flex items-center p-2 text-base font-normal rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 ${
        isActive ? 'bg-gray-100 dark:bg-gray-700' : ''
      }`
    }
  >
    {icon}
    <span className="ml-3">{text}</span>
  </NavLink>
);

export default NavigationLinks;
