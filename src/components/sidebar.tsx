import React, { useState } from "react";
import { Link } from "react-router-dom";
import Header from "./Header";

type NavItem = {
  name: string;
  href: string;
  icon: React.ReactNode;
  badge?: {
    text: string;
    color: string;
  };
};

const DashboardIcon: React.FC = () => (
  <svg
    className="w-5 h-5"
    aria-hidden="true"
    xmlns="http://www.w3.org/2000/svg"
    fill="currentColor"
    viewBox="0 0 22 21"
  >
    <path d="M16.975 11H10V4.025a1 1 0 0 0-1.066-.998 8.5 8.5 0 1 0 9.039 9.039.999.999 0 0 0-1-1.066h.002Z" />
    <path d="M12.5 0c-.157 0-.311.01-.565.027A1 1 0 0 0 11 1.02V10h8.975a1 1 0 0 0 1-.935c.013-.188.028-.374.028-.565A8.51 8.51 0 0 0 12.5 0Z" />
  </svg>
);

const EditInputIcon: React.FC = () => (
  <svg
    className="w-5 h-5"
    aria-hidden="true"
    xmlns="http://www.w3.org/2000/svg"
    fill="currentColor"
    viewBox="0 0 22 21"
  >
    <path d="M14.852 2.147a.5.5 0 0 0-.707 0l-8.29 8.29a.5.5 0 0 0-.128.22l-1 4a.5.5 0 0 0 .614.614l4-1a.5.5 0 0 0 .22-.128l8.29-8.29a.5.5 0 0 0 0-.707l-2.293-2.293a.5.5 0 0 0-.706 0ZM12.207 3.5 3.5 12.207V14h1.793L16.5 6.293 12.207 3.5Zm.707.707 1.586 1.586L5.793 14.5H4.207v-1.586l8.707-8.707Z" />
  </svg>
);

const navItems: NavItem[] = [
  { name: "Home", href: "/", icon: <DashboardIcon /> },
  {
    name: "Edit Taxonomy",
    href: "/edit-taxonomy",
    icon: <EditInputIcon />,
  },
  {
    name: "Edit Prompt",
    href: "/edit-prompt",
    icon: <EditInputIcon />,
  },
];

type SidebarProps = {
  sidebarOpen: boolean;
};

const Sidebar: React.FC<SidebarProps> = ({ sidebarOpen }) => {
  return (
    <aside
      className={`fixed top-[64px] left-0 z-40 w-64 h-screen transition-transform ${
        sidebarOpen ? "translate-x-0" : "-translate-x-full"
      } sm:translate-x-0`}
      aria-label="Sidebar"
    >
      <div className="h-full px-3 py-4 overflow-y-auto bg-primary dark:bg-gray-800">
        <ul className="space-y-2 font-medium">
          {navItems.map((item, index) => (
            <li key={index}>
              <Link
                to={item.href}
                className="flex items-center p-2 text-white rounded-lg hover:text-white dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
              >
                {item.icon}
                <span className="flex-1 ms-3 whitespace-nowrap">
                  {item.name}
                </span>
                {item.badge && (
                  <span
                    className={`inline-flex items-center justify-center px-2 ms-3 text-sm font-medium rounded-full ${item.badge.color}`}
                  >
                    {item.badge.text}
                  </span>
                )}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </aside>
  );
};

// Main App component
const SidebarWrapper: React.FC = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="relative">
      <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
      <Sidebar sidebarOpen={sidebarOpen} />
    </div>
  );
};

export default SidebarWrapper;
