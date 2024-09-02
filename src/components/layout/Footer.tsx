import React from "react";

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="py-4 text-white bg-gray-800">
      <div className="container mx-auto text-center">
        <p className="text-lg font-semibold">Scraper</p>
        <p className="mt-2 text-sm">
          &copy; {currentYear} All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
