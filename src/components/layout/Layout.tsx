import React from 'react';
import Sidebar from './Sidebar';
import Header from './Header';
import Footer from './Footer';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => (
  <div className="grid min-h-screen w-full md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]">
    <Sidebar />
    <div className="flex flex-col">
      <Header />
      <main className="flex-1 p-4 mt-16 sm:ml-64 bg-tertiary/10">
        {children}
      </main>
      <Footer />
    </div>
  </div>
);

export default Layout;