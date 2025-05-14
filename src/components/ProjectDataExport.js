import React, { useRef } from 'react';

function ProjectDataExport({ projects, importProjects }) {
    const fileInputRef = useRef(null);

    // Convert projects data to CSV string
    const projectsToCsv = (projects) => {
        if (!projects || projects.length === 0) {
            return 'No projects data';
        }

        // Main CSV headers
        let csvContent = 'Project ID,Project Name,Budget,Spent,Items\n';

        // Add project rows
        projects.forEach(project => {
            // Base project info
            let projectRow = [
                project.id,
                `"${project.name.replace(/"/g, '""')}"`, // Escape quotes in CSV
                project.budget,
                project.spent,
            ];

            // Stringify items as JSON and wrap in quotes
            // This allows us to store complex item data in a single CSV cell
            const itemsJson = JSON.stringify(project.items || []).replace(/"/g, '""');
            projectRow.push(`"${itemsJson}"`);

            csvContent += projectRow.join(',') + '\n';
        });

        return csvContent;
    };

    // Parse CSV string back to projects array
    const csvToProjects = (csvContent) => {
        try {
            // Skip header row and split into lines
            const lines = csvContent.split('\n').slice(1).filter(line => line.trim());

            if (lines.length === 0) {
                throw new Error('No valid data in CSV file');
            }

            const importedProjects = [];

            // Process each line (project)
            for (const line of lines) {
                let parts = [];
                let inQuotes = false;
                let currentPart = '';

                // Parse CSV accounting for quoted values containing commas
                for (let i = 0; i < line.length; i++) {
                    const char = line[i];
                    if (char === '"') {
                        inQuotes = !inQuotes;
                    } else if (char === ',' && !inQuotes) {
                        parts.push(currentPart);
                        currentPart = '';
                    } else {
                        currentPart += char;
                    }
                }
                parts.push(currentPart); // Add the last part

                if (parts.length < 5) {
                    console.warn('Skipping invalid line:', line);
                    continue;
                }

                // Extract project data
                const [id, name, budget, spent, itemsJson] = parts;

                // Parse items JSON, handling escaped quotes
                let items = [];
                try {
                    items = JSON.parse(itemsJson.replace(/""/g, '"'));
                } catch (e) {
                    console.error('Error parsing items JSON:', e);
                }

                // Create project object
                const project = {
                    id: id,
                    name: name.replace(/""/g, '"').replace(/^"|"$/g, ''), // Remove outer quotes and unescape inner quotes
                    budget: parseFloat(budget),
                    spent: parseFloat(spent),
                    items: items
                };

                importedProjects.push(project);
            }

            return importedProjects;
        } catch (error) {
            console.error('Error parsing CSV:', error);
            throw new Error('Invalid CSV format: ' + error.message);
        }
    };

    // Handle export button click
    const handleExport = () => {
        const csv = projectsToCsv(projects);
        const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
        const url = URL.createObjectURL(blob);

        // Create a link and trigger download
        const link = document.createElement('a');
        link.setAttribute('href', url);
        link.setAttribute('download', `remodel-projects-${new Date().toISOString().slice(0, 10)}.csv`);
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    // Handle import button click - trigger file input
    const handleImportClick = () => {
        fileInputRef.current.click();
    };

    // Handle file selection
    const handleFileChange = (event) => {
        const file = event.target.files[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onload = (e) => {
            try {
                const csvContent = e.target.result;
                const importedProjects = csvToProjects(csvContent);

                // Clear the file input for future imports
                event.target.value = '';

                // Call the parent component's import function
                importProjects(importedProjects);
            } catch (error) {
                alert('Error importing data: ' + error.message);
            }
        };
        reader.readAsText(file);
    };

    return (
        <div className="data-export-import card mb-4">
            <div className="card-header d-flex justify-content-between align-items-center">
                <h3 className="h5 mb-0">Data Backup</h3>
            </div>
            <div className="card-body">
                <p className="text-muted mb-3">
                    Export your projects data to a CSV file for backup or to transfer to another device.
                    You can also import previously exported CSV files.
                </p>

                <div className="d-flex gap-2">
                    <button
                        className="btn btn-outline-primary"
                        onClick={handleExport}
                        disabled={!projects || projects.length === 0}
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-download me-1" viewBox="0 0 16 16">
                            <path d="M.5 9.9a.5.5 0 0 1 .5.5v2.5a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-2.5a.5.5 0 0 1 1 0v2.5a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2v-2.5a.5.5 0 0 1 .5-.5z" />
                            <path d="M7.646 11.854a.5.5 0 0 0 .708 0l3-3a.5.5 0 0 0-.708-.708L8.5 10.293V1.5a.5.5 0 0 0-1 0v8.793L5.354 8.146a.5.5 0 1 0-.708.708l3 3z" />
                        </svg>
                        Export Projects
                    </button>

                    <button
                        className="btn btn-outline-secondary"
                        onClick={handleImportClick}
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-upload me-1" viewBox="0 0 16 16">
                            <path d="M.5 9.9a.5.5 0 0 1 .5.5v2.5a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-2.5a.5.5 0 0 1 1 0v2.5a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2v-2.5a.5.5 0 0 1 .5-.5z" />
                            <path d="M7.646 1.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1-.708.708L8.5 2.707V11.5a.5.5 0 0 1-1 0V2.707L5.354 4.854a.5.5 0 1 1-.708-.708l3-3z" />
                        </svg>
                        Import Projects
                    </button>

                    {/* Hidden file input */}
                    <input
                        type="file"
                        ref={fileInputRef}
                        style={{ display: 'none' }}
                        accept=".csv"
                        onChange={handleFileChange}
                    />
                </div>
            </div>
        </div>
    );
}

export default ProjectDataExport; 