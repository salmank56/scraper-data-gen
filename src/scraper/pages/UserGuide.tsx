const UserGuide = () => {
  return (
    <div className="max-w-4xl p-6 mx-auto">
      <h1 className="mb-6 text-3xl font-bold">Resonance Scraping Project - User Manual Guide</h1>
      
      <p className="mb-4 text-lg">
        Welcome to the Resonance Scraping Project! This guide will walk you through how to use the web application for scraping data efficiently and managing taxonomy files. Follow the steps below to ensure smooth operation.
      </p>

      <h2 className="mb-4 text-2xl font-semibold">1. Home Interface Overview</h2>
      <p className="mb-4 text-lg">
        When you log in to the application, you will be directed to the Home page. The Home page contains all the tools and functionalities needed to manage your data scraping tasks and taxonomy uploads.
      </p>
      <ul className="mb-6 space-y-2 list-disc list-inside">
        <li><strong>Edit Taxonomy Button:</strong> Edit taxonomy files from there, and download the previous taxonomy file for your reference.</li>
        <li><strong>New Scraping Button:</strong> Start a new scraping task by uploading a CSV file.</li>
        <li>
          <strong>Table of Scraping Tasks:</strong>
          <ul className="ml-6 list-decimal list-inside">
            <li><strong>Sector Information:</strong> View the sectors for which scraping tasks are running or have been completed.</li>
            <li><strong>State:</strong> View the status of the scraping process (e.g., "Processing," "Failed", "Completed").</li>
            <li><strong>Last Run Time:</strong> Displays the last time the scraping task was executed.</li>
            <li><strong>Actions:</strong> Download results after the task is completed.</li>
          </ul>
        </li>
      </ul>

      <h3 className="mb-4 text-xl font-semibold">Notes</h3>
      <ul className="mb-6 space-y-2 list-disc list-inside">
        <li>Do not use any special characters in the company names when uploading a CSV file.</li>
        <li>Always add a LinkedIn URL in the format <code>https://www.linkedin.com/company/advanced-cooling-technologies/</code>. Do not include additional information such as "/about."</li>
        <li>Do not add entities with multiple sub-companies (big companies) (e.g., NASA).</li>
      </ul>

      <h2 className="mb-4 text-2xl font-semibold">2. How to Start a New Scraping Task</h2>
      <p className="mb-4 text-lg">
        To start a new scraping task:
      </p>
      <ol className="mb-6 space-y-2 list-decimal list-inside">
        <li>Click on <strong>“New Scraping”</strong>: This button will initiate the process of uploading a new file for scraping.</li>
        <li>Select a <strong>Sector:</strong> Choose the sector relevant to the data you are scraping (e.g., Space, Climate, Quantum).</li>
        <li>Upload your CSV file by clicking <strong>"Choose file."</strong></li>
        <li>
          The file must contain the following columns:
          <ul className="ml-6 list-disc list-inside">
            <li>Company Name</li>
            <li>Website</li>
            <li>LinkedIn URL</li>
          </ul>
        </li>
        <li>Click <strong>“Start Export”</strong>: Once the sector is selected and the file is uploaded, press Start Export.</li>
      </ol>

      <h2 className="mb-4 text-2xl font-semibold">3. View Logs and Process Monitoring</h2>
      <p className="mb-4 text-lg">
        Once the scraping task is initiated, you can monitor its progress:
      </p>
      <ul className="mb-6 space-y-2 list-disc list-inside">
        <li><strong>View Logs Button:</strong> In the lower right corner of the page, there is a View Logs button. Clicking this button will allow you to view real-time logs of the scraping process.</li>
        <li><strong>State:</strong> In the table, under the “State” column, you can track whether the scraping is currently "Processing" or if it "Failed."</li>
        <li>If the scraping fails, refer to the logs for detailed error messages.</li>
      </ul>

      <h2 className="mb-4 text-2xl font-semibold">4. Downloading Scraped Data</h2>
      <p className="mb-4 text-lg">
        Once the scraping process is complete:
      </p>
      <ul className="mb-6 space-y-2 list-disc list-inside">
        <li><strong>Actions:</strong> In the "Actions" column, you will be able to download the results. Simply click the Download icon.</li>
        <li><strong>File Format:</strong> The data will be downloaded as a ZIP file containing the scraped results.</li>
      </ul>

      <h2 className="mb-4 text-2xl font-semibold">5. Edit Taxonomy Section</h2>
      <p className="mb-4 text-lg">
        In addition to scraping, the application allows you to manage taxonomy files:
      </p>
      <ul className="mb-6 space-y-2 list-disc list-inside">
        <li><strong>Select Scope:</strong> Navigate to the “Edit Taxonomy” page and choose the sector you want to edit.</li>
        <li><strong>Upload Taxonomy File:</strong> Upload a CSV file containing the taxonomy data.</li>
        <li><strong>Update Taxonomy:</strong> After uploading, click <strong>Update Taxonomy</strong> to finalize changes.</li>
      </ul>

      <h2 className="mb-4 text-2xl font-semibold">6. Monitoring the Scraping Process</h2>
      <p className="mb-4 text-lg">
        Once a scraping task is started, it will be visible on the Home page under the table, with the following columns:
      </p>
      <ul className="mb-6 space-y-2 list-disc list-inside">
        <li><strong>Sector:</strong> Indicates the sector associated with the scraping task.</li>
        <li><strong>Last Run Time:</strong> Displays the last time the scraping task ran.</li>
        <li><strong>State:</strong> Shows the current state of the task (Processing, Failed, Completed).</li>
        <li><strong>Actions:</strong> Allows the user to download the resulting ZIP file once the task is completed.</li>
      </ul>

      <h3 className="mb-4 text-xl font-semibold">Troubleshooting</h3>
      <ul className="mb-6 space-y-2 list-disc list-inside">
        <li><strong>Failed Tasks:</strong> If a scraping task fails, check the logs to identify the problem. Common issues include incorrectly formatted input files or server-related errors.</li>
        <li><strong>Taxonomy Upload Issues:</strong> Ensure that the taxonomy file follows the correct format and matches the previous taxonomy structure.</li>
      </ul>

      <p className="text-lg">
        By following this user manual, you should be able to navigate the Resonance Scraping Project web application effectively. Ensure that input files are correctly formatted, and always monitor the logs for process details.
      </p>
    </div>
  );
}

export default UserGuide;
