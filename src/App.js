import React, { useState, useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import ProjectsPage from './pages/ProjectsPage';
import ProjectDetailPage from './pages/ProjectDetailPage';
import StorageNotification from './components/StorageNotification';
import ProjectDataExport from './components/ProjectDataExport';

function App() {
    const [projects, setProjects] = useState([]);
    const [editingProject, setEditingProject] = useState(null);

    // Load projects from localStorage on component mount
    useEffect(() => {
        const savedProjects = localStorage.getItem('projects');
        if (savedProjects) {
            setProjects(JSON.parse(savedProjects));
        }
    }, []);

    // Save projects to localStorage whenever they change
    useEffect(() => {
        localStorage.setItem('projects', JSON.stringify(projects));
    }, [projects]);

    // Add a new project or update an existing one
    const saveProject = (project) => {
        if (editingProject) {
            // Update existing project
            setProjects(projects.map(p =>
                p.id === project.id ? project : p
            ));
            setEditingProject(null);
        } else {
            // Add new project with unique ID
            setProjects([...projects, {
                ...project,
                id: Date.now().toString(),
                items: [] // Initialize with empty items array
            }]);
        }
    };

    // Update a project (used for updating from project detail page)
    const updateProject = (updatedProject) => {
        setProjects(projects.map(p =>
            p.id === updatedProject.id ? updatedProject : p
        ));
    };

    // Delete a project
    const deleteProject = (projectId) => {
        setProjects(projects.filter(project => project.id !== projectId));
    };

    // Set a project for editing
    const editProject = (project) => {
        setEditingProject(project);
    };

    // Import projects from CSV
    const importProjects = (importedProjects) => {
        if (!importedProjects || importedProjects.length === 0) {
            alert('No valid projects found in the import file.');
            return;
        }

        // Confirm before importing
        const confirmMessage = `This will import ${importedProjects.length} projects. Existing projects with the same IDs will be updated. Continue?`;
        if (!window.confirm(confirmMessage)) {
            return;
        }

        // Create a map of existing projects for easy lookup
        const existingProjectsMap = projects.reduce((map, project) => {
            map[project.id] = true;
            return map;
        }, {});

        // Separate new and updated projects
        const newProjects = [];
        const updatedProjects = [];

        importedProjects.forEach(importedProject => {
            if (existingProjectsMap[importedProject.id]) {
                updatedProjects.push(importedProject);
            } else {
                newProjects.push(importedProject);
            }
        });

        // Update existing projects and add new ones
        setProjects(prevProjects => {
            const updatedProjectsList = prevProjects.map(project => {
                const updatedProject = updatedProjects.find(p => p.id === project.id);
                return updatedProject || project;
            });
            
            return [...updatedProjectsList, ...newProjects];
        });

        alert(`Import complete! Added ${newProjects.length} new projects and updated ${updatedProjects.length} existing projects.`);
    };

    return (
        <Routes>
            <Route
                path="/"
                element={
                    <>
                        <StorageNotification />
                        <ProjectsPage
                            projects={projects}
                            editingProject={editingProject}
                            setEditingProject={setEditingProject}
                            saveProject={saveProject}
                            deleteProject={deleteProject}
                            editProject={editProject}
                        >
                            <ProjectDataExport
                                projects={projects}
                                importProjects={importProjects}
                            />
                        </ProjectsPage>
                    </>
                }
            />
            <Route
                path="/project/:projectId"
                element={
                    <>
                        <StorageNotification />
                        <ProjectDetailPage
                            projects={projects}
                            updateProject={updateProject}
                        />
                    </>
                }
            />
            <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
    );
}

export default App; 