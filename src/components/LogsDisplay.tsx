// import React, { useState, useRef, useEffect } from "react";

// interface Log {
//   message: string;
//   color: string;
// }

// interface LogDisplayProps {
//   logs: Log[];
// }

// const LogDisplay: React.FC<LogDisplayProps> = React.memo(({ logs }) => {
//   const [isOpen, setIsOpen] = useState(false);
//   const [autoScroll, setAutoScroll] = useState(true);
//   const logContainerRef = useRef<HTMLUListElement>(null);

//   const toggleLogs = () => setIsOpen(!isOpen);

//   const handleScroll = () => {
//     if (logContainerRef.current) {
//       const { scrollTop, scrollHeight, clientHeight } = logContainerRef.current;
//       const isAtBottom = scrollTop + clientHeight >= scrollHeight;

//       setAutoScroll(isAtBottom);
//     }
//   };

//   useEffect(() => {
//     if (logContainerRef.current && autoScroll) {
//       logContainerRef.current.scrollTop = logContainerRef.current.scrollHeight;
//     }
//   }, [logs, autoScroll]);

//   return (
//     <div>
//       <div className="fixed bottom-0 right-0 z-10 mb-4 mr-4 fixes">
//         <button
//           onClick={toggleLogs}
//           className="flex items-center px-4 py-2 text-white transition duration-300 rounded-md bg-tertiary hover:bg-tertiary/90"
//         >
//           <svg
//             xmlns="http://www.w3.org/2000/svg"
//             className="w-6 h-6 mr-2"
//             fill="none"
//             viewBox="0 0 24 24"
//             stroke="currentColor"
//           >
//             <path
//               strokeLinecap="round"
//               strokeLinejoin="round"
//               strokeWidth="2"
//               d="M4 6h16M4 12h16m-7 6h7"
//             />
//           </svg>
//           {isOpen ? "Hide Logs" : "View Logs"}
//         </button>
//       </div>
//       {isOpen && (
//         <div className="fixed max-w-full right-4 max-sm:left-4 z-50 sm:w-[calc(100%-18rem)]  bg-white border-t border-gray-300 shadow-lg h-96 bottom-4 ">
//           <div className="flex items-center justify-between p-4 text-white rounded-t-md bg-tertiary">
//             <h2 className="font-bold">Progress Logs</h2>
//             <button
//               onClick={toggleLogs}
//               className="text-white hover:text-white focus:outline-none"
//             >
//               <svg
//                 xmlns="http://www.w3.org/2000/svg"
//                 className="w-5 h-5"
//                 fill="none"
//                 viewBox="0 0 24 24"
//                 stroke="currentColor"
//               >
//                 <path
//                   strokeLinecap="round"
//                   strokeLinejoin="round"
//                   strokeWidth="2"
//                   d="M6 18L18 6M6 6l12 12"
//                 />
//               </svg>
//             </button>
//           </div>
//           <ul
//             ref={logContainerRef}
//             className="h-[calc(24rem-56px)] rounded-b-md p-2 overflow-y-auto text-sm break-words bg-black"
//             onScroll={handleScroll}
//           >
//             {logs && logs.length > 0 ? (
//               logs.map((log, index) => (
//                 <li key={index} className="mb-1" style={{ color: log.color }}>
//                   {log.message}
//                 </li>
//               ))
//             ) : (
//               <li>No Process Running</li>
//             )}
//           </ul>
//         </div>
//       )}
//     </div>
//   );
// });

// export default LogDisplay;

import React, { useState, useRef, useEffect } from "react";

interface Log {
  message: string;
  color: string;
}

interface LogDisplayProps {
  logs: Log[];
}

const LogDisplay: React.FC<LogDisplayProps> = React.memo(({ logs }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [autoScroll, setAutoScroll] = useState(true);
  const [isAtBottom, setIsAtBottom] = useState(true);
  const logContainerRef = useRef<HTMLUListElement>(null);

  const toggleLogs = () => setIsOpen(!isOpen);

  const handleScroll = () => {
    if (logContainerRef.current) {
      const { scrollTop, scrollHeight, clientHeight } = logContainerRef.current;
      const atBottom = scrollTop + clientHeight >= scrollHeight - 10;
      setIsAtBottom(atBottom);
      setAutoScroll(atBottom);
    }
  };

  const scrollToBottom = () => {
    if (logContainerRef.current) {
      logContainerRef.current.scrollTop = logContainerRef.current.scrollHeight;
    }
  };

  useEffect(() => {
    if (logContainerRef.current && autoScroll) {
      scrollToBottom();
    }
  }, [logs, autoScroll]);

  return (
    <div>
      <div className="fixed bottom-0 right-0 z-10 mb-4 mr-4 fixes">
        <button
          onClick={toggleLogs}
          className="flex items-center px-4 py-2 text-white transition duration-300 rounded-md bg-tertiary hover:bg-tertiary/90"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-6 h-6 mr-2"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M4 6h16M4 12h16m-7 6h7"
            />
          </svg>
          {isOpen ? "Hide Logs" : "View Logs"}
        </button>
      </div>
      {isOpen && (
        <div className="fixed max-w-full right-4 max-sm:left-4 z-50 sm:w-[calc(100%-18rem)] bg-white border-t border-gray-300 shadow-lg h-96 bottom-4">
          <div className="flex items-center justify-between p-4 text-white rounded-t-md bg-tertiary">
            <h2 className="font-bold">Progress Logs</h2>
            <button
              onClick={toggleLogs}
              className="text-white hover:text-white focus:outline-none"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-5 h-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
          <div className="relative">
            <ul
              ref={logContainerRef}
              className="h-[calc(24rem-56px)] rounded-b-md p-2 overflow-y-auto text-sm break-words bg-black"
              onScroll={handleScroll}
            >
              {logs && logs.length > 0 ? (
                logs.map((log, index) => (
                  <li key={index} className="mb-1" style={{ color: log.color }}>
                    {log.message}
                  </li>
                ))
              ) : (
                <li>No Process Running</li>
              )}
            </ul>
            {!isAtBottom && (
              <button
                onClick={scrollToBottom}
                className="absolute p-2 text-white transition duration-300 rounded-full shadow-md bottom-4 right-4 bg-tertiary hover:bg-tertiary/90"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-5 h-5"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M14.707 12.293a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 111.414-1.414L10 15.586l3.293-3.293a1 1 0 011.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
});

export default LogDisplay;
