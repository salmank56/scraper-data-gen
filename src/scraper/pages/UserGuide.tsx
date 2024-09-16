// import React from 'react';
// import { BookOpen, Home, Edit, PlayCircle, Download, AlertTriangle, LucideIcon } from 'lucide-react';

// interface SectionProps {
//   icon: LucideIcon;
//   title: string;
//   content: React.ReactNode;
// }

// const Section: React.FC<SectionProps> = ({ icon: Icon, title, content }) => (
//   <div className="p-6 bg-white rounded-lg shadow-md">
//     <h2 className="flex items-center mb-4 text-2xl font-semibold text-indigo-700">
//       <Icon className="mr-2" />
//       {title}
//     </h2>
//     {content}
//   </div>
// );

// const UserGuide: React.FC = () => {
//   return (
//     <div className="max-w-6xl p-8 mx-auto rounded-lg shadow-xl bg-gradient-to-br from-blue-50 to-indigo-100">
//       <h1 className="mb-8 text-4xl font-bold text-center text-indigo-800">
//         Resonance Scraping Project
//         <span className="block mt-2 text-2xl font-normal text-indigo-600">User Manual Guide</span>
//       </h1>
      
//       <div className="p-6 mb-8 bg-white rounded-lg shadow-md">
//         <h2 className="flex items-center mb-4 text-2xl font-semibold text-indigo-700">
//           <BookOpen className="mr-2" />
//           Welcome to Resonance Scraping
//         </h2>
//         <p className="text-lg text-gray-700">
//           This guide will walk you through using the web application for efficient data scraping and taxonomy management. Follow these steps for smooth operation.
//         </p>
//       </div>

//       <div className="grid gap-8 md:grid-cols-2">
//         <Section
//           icon={Home}
//           title="1. Home Interface Overview"
//           content={
//             <ul className="space-y-2 text-gray-700">
//               <li><strong className="text-indigo-600">Edit Taxonomy Button:</strong> Manage taxonomy files</li>
//               <li><strong className="text-indigo-600">New Scraping Button:</strong> Start a new scraping task</li>
//               <li><strong className="text-indigo-600">Table of Scraping Tasks:</strong> View and manage ongoing and completed tasks</li>
//             </ul>
//           }
//         />

//         <Section
//           icon={PlayCircle}
//           title="2. Starting a New Scraping Task"
//           content={
//             <ol className="space-y-2 text-gray-700 list-decimal list-inside">
//               <li>Click on "New Scraping"</li>
//               <li>Select a Sector</li>
//               <li>Upload your CSV file</li>
//               <li>Click "Start Export"</li>
//             </ol>
//           }
//         />

//         <Section
//           icon={AlertTriangle}
//           title="3. View Logs and Process Monitoring"
//           content={
//             <ul className="space-y-2 text-gray-700">
//               <li><strong className="text-indigo-600">View Logs Button:</strong> Check real-time process logs</li>
//               <li><strong className="text-indigo-600">State Column:</strong> Track task status in the table</li>
//               <li>Refer to logs for detailed error messages if scraping fails</li>
//             </ul>
//           }
//         />

//         <Section
//           icon={Download}
//           title="4. Downloading Scraped Data"
//           content={
//             <ul className="space-y-2 text-gray-700">
//               <li><strong className="text-indigo-600">Actions Column:</strong> Click the Download icon</li>
//               <li><strong className="text-indigo-600">File Format:</strong> Results downloaded as a ZIP file</li>
//             </ul>
//           }
//         />

//         <Section
//           icon={Edit}
//           title="5. Edit Taxonomy Section"
//           content={
//             <ul className="space-y-2 text-gray-700">
//               <li><strong className="text-indigo-600">Select Scope:</strong> Choose the sector to edit</li>
//               <li><strong className="text-indigo-600">Upload Taxonomy File:</strong> Submit CSV with taxonomy data</li>
//               <li><strong className="text-indigo-600">Update Taxonomy:</strong> Click to finalize changes</li>
//             </ul>
//           }
//         />
//       </div>

//       <div className="p-6 mt-8 rounded-lg shadow-md bg-yellow-50">
//         <h2 className="mb-4 text-2xl font-semibold text-yellow-700">Important Notes</h2>
//         <ul className="space-y-2 text-yellow-800">
//           <li>Avoid special characters in company names</li>
//           <li>Use correct LinkedIn URL format</li>
//           <li>Don't add entities with multiple sub-companies</li>
//         </ul>
//       </div>

//       <footer className="mt-8 text-center text-gray-600">
//         © {new Date().getFullYear()} Resonance Scraping Project. All rights reserved.
//       </footer>
//     </div>
//   );
// };

// export default UserGuide;

// import React, { useState } from 'react';
// import { BookOpen, Home, Edit, PlayCircle, Download, AlertTriangle, ChevronDown, ChevronUp, LucideIcon } from 'lucide-react';
// import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

// interface SectionProps {
//   icon: LucideIcon;
//   title: string;
//   content: React.ReactNode;
// }

// const Section: React.FC<SectionProps> = ({ icon: Icon, title, content }) => {
//   const [isOpen, setIsOpen] = useState(false);

//   return (
//     <div className="mb-4 overflow-hidden bg-white rounded-lg shadow-md">
//       <button
//         className="flex items-center justify-between w-full p-4 text-left transition-colors hover:bg-indigo-50"
//         onClick={() => setIsOpen(!isOpen)}
//       >
//         <div className="flex items-center">
//           <Icon className="w-6 h-6 mr-2 text-indigo-600" />
//           <h2 className="text-xl font-semibold text-indigo-700">{title}</h2>
//         </div>
//         {isOpen ? <ChevronUp className="w-5 h-5 text-indigo-600" /> : <ChevronDown className="w-5 h-5 text-indigo-600" />}
//       </button>
//       {isOpen && <div className="p-4 bg-indigo-50">{content}</div>}
//     </div>
//   );
// };

// const UserGuide: React.FC = () => {
//   const [activeTab, setActiveTab] = useState<'guide' | 'notes'>('guide');

//   return (
//     <div className="max-w-4xl p-8 mx-auto rounded-lg shadow-xl bg-gradient-to-br from-blue-50 to-indigo-100">
//       <h1 className="mb-8 text-4xl font-bold text-center text-indigo-800">
//         Resonance Scraping Project
//         <span className="block mt-2 text-2xl font-normal text-indigo-600">User Manual Guide</span>
//       </h1>
      
//       <Alert className="mb-8">
//         <AlertTitle className="text-lg font-semibold">Welcome to Resonance Scraping</AlertTitle>
//         <AlertDescription>
//           This interactive guide will walk you through using the web application for efficient data scraping and taxonomy management. Explore each section for detailed instructions.
//         </AlertDescription>
//       </Alert>

//       <div className="mb-8">
//         <div className="flex mb-4 space-x-4">
//           <button
//             className={`px-4 py-2 font-semibold rounded-t-lg ${activeTab === 'guide' ? 'bg-white text-indigo-700' : 'bg-indigo-200 text-indigo-600'}`}
//             onClick={() => setActiveTab('guide')}
//           >
//             User Guide
//           </button>
//           <button
//             className={`px-4 py-2 font-semibold rounded-t-lg ${activeTab === 'notes' ? 'bg-white text-indigo-700' : 'bg-indigo-200 text-indigo-600'}`}
//             onClick={() => setActiveTab('notes')}
//           >
//             Important Notes
//           </button>
//         </div>

//         {activeTab === 'guide' ? (
//           <div className="p-6 bg-white rounded-lg shadow-md">
//             <Section
//               icon={Home}
//               title="1. Home Interface Overview"
//               content={
//                 <ul className="space-y-2 text-gray-700 list-disc list-inside">
//                   <li><strong className="text-indigo-600">Edit Taxonomy Button:</strong> Manage taxonomy files</li>
//                   <li><strong className="text-indigo-600">New Scraping Button:</strong> Start a new scraping task</li>
//                   <li><strong className="text-indigo-600">Table of Scraping Tasks:</strong> View and manage ongoing and completed tasks</li>
//                 </ul>
//               }
//             />
//             <Section
//               icon={PlayCircle}
//               title="2. Starting a New Scraping Task"
//               content={
//                 <ol className="space-y-2 text-gray-700 list-decimal list-inside">
//                   <li>Click on "New Scraping"</li>
//                   <li>Select a Sector</li>
//                   <li>Upload your CSV file</li>
//                   <li>Click "Start Export"</li>
//                 </ol>
//               }
//             />
//             <Section
//               icon={AlertTriangle}
//               title="3. View Logs and Process Monitoring"
//               content={
//                 <ul className="space-y-2 text-gray-700 list-disc list-inside">
//                   <li><strong className="text-indigo-600">View Logs Button:</strong> Check real-time process logs</li>
//                   <li><strong className="text-indigo-600">State Column:</strong> Track task status in the table</li>
//                   <li>Refer to logs for detailed error messages if scraping fails</li>
//                 </ul>
//               }
//             />
//             <Section
//               icon={Download}
//               title="4. Downloading Scraped Data"
//               content={
//                 <ul className="space-y-2 text-gray-700 list-disc list-inside">
//                   <li><strong className="text-indigo-600">Actions Column:</strong> Click the Download icon</li>
//                   <li><strong className="text-indigo-600">File Format:</strong> Results downloaded as a ZIP file</li>
//                 </ul>
//               }
//             />
//             <Section
//               icon={Edit}
//               title="5. Edit Taxonomy Section"
//               content={
//                 <ul className="space-y-2 text-gray-700 list-disc list-inside">
//                   <li><strong className="text-indigo-600">Select Scope:</strong> Choose the sector to edit</li>
//                   <li><strong className="text-indigo-600">Upload Taxonomy File:</strong> Submit CSV with taxonomy data</li>
//                   <li><strong className="text-indigo-600">Update Taxonomy:</strong> Click to finalize changes</li>
//                 </ul>
//               }
//             />
//           </div>
//         ) : (
//           <div className="p-6 bg-white rounded-lg shadow-md">
//             <h2 className="mb-4 text-2xl font-semibold text-yellow-700">Important Notes</h2>
//             <ul className="space-y-2 text-yellow-800 list-disc list-inside">
//               <li>Avoid special characters in company names</li>
//               <li>Use correct LinkedIn URL format</li>
//               <li>Don't add entities with multiple sub-companies</li>
//             </ul>
//           </div>
//         )}
//       </div>

//       <footer className="mt-8 text-center text-gray-600">
//         © {new Date().getFullYear()} Resonance Scraping Project. All rights reserved.
//       </footer>
//     </div>
//   );
// };

// export default UserGuide;


// import React, { useState } from 'react';
// import {
//   BookOpen,
//   Home,
//   Edit,
//   PlayCircle,
//   Download,
//   AlertTriangle,
//   ChevronDown,
//   ChevronUp,
//   LucideIcon,
// } from 'lucide-react';
// import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

// interface SectionProps {
//   icon: LucideIcon;
//   title: string;
//   content: React.ReactNode;
// }

// const Section: React.FC<SectionProps> = ({ icon: Icon, title, content }) => {
//   const [isOpen, setIsOpen] = useState(false);

//   return (
//     <div className="mb-4 overflow-hidden rounded-lg shadow-md bg-gradient-to-r from-purple-50 to-indigo-100">
//       <button
//         className="flex items-center justify-between w-full p-4 text-left transition-colors duration-300 ease-in-out hover:bg-gradient-to-r hover:from-indigo-200 hover:to-indigo-100"
//         onClick={() => setIsOpen(!isOpen)}
//       >
//         <div className="flex items-center">
//           <Icon className="w-6 h-6 mr-2 text-indigo-600" />
//           <h2 className="text-xl font-semibold text-indigo-800">{title}</h2>
//         </div>
//         {isOpen ? <ChevronUp className="w-5 h-5 text-indigo-600" /> : <ChevronDown className="w-5 h-5 text-indigo-600" />}
//       </button>
//       {isOpen && <div className="p-4 bg-indigo-50">{content}</div>}
//     </div>
//   );
// };

// const UserGuide: React.FC = () => {
//   const [activeTab, setActiveTab] = useState<'guide' | 'notes'>('guide');

//   return (
//     <div className="max-w-4xl p-8 mx-auto rounded-lg shadow-xl bg-gradient-to-br from-purple-50 to-indigo-50">
//       <h1 className="mb-8 text-4xl font-bold text-center text-indigo-900">
//         Resonance Scraping Project
//         <span className="block mt-2 text-2xl font-normal text-indigo-700">
//           User Manual Guide
//         </span>
//       </h1>

//       <Alert className="mb-8 bg-indigo-100 border border-indigo-300">
//         <AlertTitle className="text-lg font-semibold text-indigo-900">
//           Welcome to Resonance Scraping
//         </AlertTitle>
//         <AlertDescription className="text-indigo-800">
//           This interactive guide will walk you through using the web application
//           for efficient data scraping and taxonomy management. Explore each
//           section for detailed instructions.
//         </AlertDescription>
//       </Alert>

//       <div className="mb-8">
//         <div className="flex mb-4 space-x-4">
//           <button
//             className={`px-4 py-2 font-semibold rounded-t-lg transition-colors duration-300 ease-in-out ${
//               activeTab === 'guide'
//                 ? 'bg-white text-indigo-900'
//                 : 'bg-indigo-200 text-indigo-700'
//             }`}
//             onClick={() => setActiveTab('guide')}
//           >
//             User Guide
//           </button>
//           <button
//             className={`px-4 py-2 font-semibold rounded-t-lg transition-colors duration-300 ease-in-out ${
//               activeTab === 'notes'
//                 ? 'bg-white text-indigo-900'
//                 : 'bg-indigo-200 text-indigo-700'
//             }`}
//             onClick={() => setActiveTab('notes')}
//           >
//             Important Notes
//           </button>
//         </div>

//         {activeTab === 'guide' ? (
//           <div className="p-6 bg-white rounded-lg shadow-md">
//             <Section
//               icon={Home}
//               title="1. Home Interface Overview"
//               content={
//                 <ul className="space-y-2 text-gray-700 list-disc list-inside">
//                   <li>
//                     <strong className="text-indigo-600">Edit Taxonomy Button:</strong> Manage taxonomy files
//                   </li>
//                   <li>
//                     <strong className="text-indigo-600">New Scraping Button:</strong> Start a new scraping task
//                   </li>
//                   <li>
//                     <strong className="text-indigo-600">Table of Scraping Tasks:</strong> View and manage ongoing and completed tasks
//                   </li>
//                 </ul>
//               }
//             />
//             <Section
//               icon={PlayCircle}
//               title="2. Starting a New Scraping Task"
//               content={
//                 <ol className="space-y-2 text-gray-700 list-decimal list-inside">
//                   <li>Click on "New Scraping"</li>
//                   <li>Select a Sector</li>
//                   <li>Upload your CSV file</li>
//                   <li>Click "Start Export"</li>
//                 </ol>
//               }
//             />
//             <Section
//               icon={AlertTriangle}
//               title="3. View Logs and Process Monitoring"
//               content={
//                 <ul className="space-y-2 text-gray-700 list-disc list-inside">
//                   <li>
//                     <strong className="text-indigo-600">View Logs Button:</strong> Check real-time process logs
//                   </li>
//                   <li>
//                     <strong className="text-indigo-600">State Column:</strong> Track task status in the table
//                   </li>
//                   <li>Refer to logs for detailed error messages if scraping fails</li>
//                 </ul>
//               }
//             />
//             <Section
//               icon={Download}
//               title="4. Downloading Scraped Data"
//               content={
//                 <ul className="space-y-2 text-gray-700 list-disc list-inside">
//                   <li>
//                     <strong className="text-indigo-600">Actions Column:</strong> Click the Download icon
//                   </li>
//                   <li>
//                     <strong className="text-indigo-600">File Format:</strong> Results downloaded as a ZIP file
//                   </li>
//                 </ul>
//               }
//             />
//             <Section
//               icon={Edit}
//               title="5. Edit Taxonomy Section"
//               content={
//                 <ul className="space-y-2 text-gray-700 list-disc list-inside">
//                   <li>
//                     <strong className="text-indigo-600">Select Scope:</strong> Choose the sector to edit
//                   </li>
//                   <li>
//                     <strong className="text-indigo-600">Upload Taxonomy File:</strong> Submit CSV with taxonomy data
//                   </li>
//                   <li>
//                     <strong className="text-indigo-600">Update Taxonomy:</strong> Click to finalize changes
//                   </li>
//                 </ul>
//               }
//             />
//           </div>
//         ) : (
//           <div className="p-6 bg-white rounded-lg shadow-md">
//             <h2 className="mb-4 text-2xl font-semibold text-yellow-700">
//               Important Notes
//             </h2>
//             <ul className="space-y-2 text-yellow-800 list-disc list-inside">
//               <li>Avoid special characters in company names</li>
//               <li>Use correct LinkedIn URL format</li>
//               <li>Don't add entities with multiple sub-companies</li>
//             </ul>
//           </div>
//         )}
//       </div>

//       <footer className="mt-8 text-center text-gray-600">
//         © {new Date().getFullYear()} Resonance Scraping Project. All rights reserved.
//       </footer>
//     </div>
//   );
// };

// export default UserGuide;

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
