import React, { useState } from 'react';
import {
  Home,
  Edit,
  PlayCircle,
  Download,
  AlertTriangle,
  ChevronDown,
  ChevronUp,
  LucideIcon,
} from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

interface SectionProps {
  icon: LucideIcon;
  title: string;
  content: React.ReactNode;
}

const Section: React.FC<SectionProps> = ({ icon: Icon, title, content }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="mb-4 overflow-hidden bg-gray-800 rounded-lg shadow-md"> {/* Dark theme for consistency */}
      <button
        className="flex items-center justify-between w-full p-4 text-left transition-colors duration-300 ease-in-out hover:bg-gray-700"
        onClick={() => setIsOpen(!isOpen)}
      >
        <div className="flex items-center">
          <Icon className="w-6 h-6 mr-2 text-teal-400" /> {/* Icons matching your sidebar/header */}
          <h2 className="text-xl font-semibold text-white">{title}</h2> {/* Text color matching sidebar */}
        </div>
        {isOpen ? <ChevronUp className="w-5 h-5 text-teal-400" /> : <ChevronDown className="w-5 h-5 text-teal-400" />}
      </button>
      {isOpen && <div className="p-4 text-gray-300 bg-gray-700">{content}</div>} {/* Open section styling */}
    </div>
  );
};

const UserGuide: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'guide' | 'notes'>('guide');

  return (
    <div className="max-w-4xl p-8 mx-auto bg-gray-900 rounded-lg shadow-xl"> {/* Match background to main layout */}
      <h1 className="mb-8 text-4xl font-bold text-center text-teal-400">
        Resonance Scraping Project
        <span className="block mt-2 text-2xl font-normal text-gray-300"> {/* Subtitle matching sidebar text */}
          User Manual Guide
        </span>
      </h1>

      <Alert className="mb-8 bg-gray-800 border border-teal-400"> {/* Alert with consistent dark theme */}
        <AlertTitle className="text-lg font-semibold text-teal-400">
          Welcome to Resonance Scraping
        </AlertTitle>
        <AlertDescription className="text-gray-300">
          This interactive guide will walk you through using the web application for efficient data scraping and taxonomy management. Explore each section for detailed instructions.
        </AlertDescription>
      </Alert>

      <div className="mb-8">
        <div className="flex mb-4 space-x-4">
          <button
            className={`px-4 py-2 font-semibold rounded-t-lg transition-colors duration-300 ease-in-out ${
              activeTab === 'guide' ? 'bg-gray-800 text-teal-400' : 'bg-gray-700 text-gray-300'
            }`}
            onClick={() => setActiveTab('guide')}
          >
            User Guide
          </button>
          <button
            className={`px-4 py-2 font-semibold rounded-t-lg transition-colors duration-300 ease-in-out ${
              activeTab === 'notes' ? 'bg-gray-800 text-teal-400' : 'bg-gray-700 text-gray-300'
            }`}
            onClick={() => setActiveTab('notes')}
          >
            Important Notes
          </button>
        </div>

        {activeTab === 'guide' ? (
          <div className="p-6 text-gray-300 bg-gray-800 rounded-lg shadow-md">
            <Section
              icon={Home}
              title="1. Home Interface Overview"
              content={
                <ul className="space-y-2 list-disc list-inside">
                  <li>
                    <strong className="text-teal-400">Edit Taxonomy Button:</strong> Manage taxonomy files
                  </li>
                  <li>
                    <strong className="text-teal-400">New Scraping Button:</strong> Start a new scraping task
                  </li>
                  <li>
                    <strong className="text-teal-400">Table of Scraping Tasks:</strong> View and manage ongoing and completed tasks
                  </li>
                </ul>
              }
            />
            <Section
              icon={PlayCircle}
              title="2. Starting a New Scraping Task"
              content={
                <ol className="space-y-2 list-decimal list-inside">
                  <li>Click on "New Scraping"</li>
                  <li>Select a Sector</li>
                  <li>Upload your CSV file</li>
                  <li>Click "Start Export"</li>
                </ol>
              }
            />
            <Section
              icon={AlertTriangle}
              title="3. View Logs and Process Monitoring"
              content={
                <ul className="space-y-2 list-disc list-inside">
                  <li>
                    <strong className="text-teal-400">View Logs Button:</strong> Check real-time process logs
                  </li>
                  <li>
                    <strong className="text-teal-400">State Column:</strong> Track task status in the table
                  </li>
                  <li>Refer to logs for detailed error messages if scraping fails</li>
                </ul>
              }
            />
            <Section
              icon={Download}
              title="4. Downloading Scraped Data"
              content={
                <ul className="space-y-2 list-disc list-inside">
                  <li>
                    <strong className="text-teal-400">Actions Column:</strong> Click the Download icon
                  </li>
                  <li>
                    <strong className="text-teal-400">File Format:</strong> Results downloaded as a ZIP file
                  </li>
                </ul>
              }
            />
            <Section
              icon={Edit}
              title="5. Edit Taxonomy Section"
              content={
                <ul className="space-y-2 list-disc list-inside">
                  <li>
                    <strong className="text-teal-400">Select Scope:</strong> Choose the sector to edit
                  </li>
                  <li>
                    <strong className="text-teal-400">Upload Taxonomy File:</strong> Submit CSV with taxonomy data
                  </li>
                  <li>
                    <strong className="text-teal-400">Update Taxonomy:</strong> Click to finalize changes
                  </li>
                  <li>
                    <strong className="text-teal-400">Download Previous Taxonomy:</strong> Select Scope and click to download previous taxonomy
                  </li>
                </ul>
              }
            />
          </div>
        ) : (
          <div className="p-6 text-gray-300 bg-gray-800 rounded-lg shadow-md">
            <h2 className="mb-4 text-2xl font-semibold text-teal-400">Important Notes</h2>
            <ul className="space-y-2 list-disc list-inside">
              <li>Avoid special characters in company names</li>
              <li>Use correct LinkedIn URL format</li>
              <li>Don't add entities with multiple sub-companies</li>
            </ul>
          </div>
        )}
      </div>

      <footer className="mt-8 text-center text-gray-400">
        © {new Date().getFullYear()} Resonance Scraping Project. All rights reserved.
      </footer>
    </div>
  );
};

export default UserGuide;
