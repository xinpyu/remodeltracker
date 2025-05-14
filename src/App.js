import React, { useState, useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import ProjectsPage from './pages/ProjectsPage';
import ProjectDetailPage from './pages/ProjectDetailPage';

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

    return (
        <Routes>
            <Route
                path="/"
                element={
                    <ProjectsPage
                        projects={projects}
                        editingProject={editingProject}
                        setEditingProject={setEditingProject}
                        saveProject={saveProject}
                        deleteProject={deleteProject}
                        editProject={editProject}
                    />
                }
            />
            <Route
                path="/project/:projectId"
                element={
                    <ProjectDetailPage
                        projects={projects}
                        updateProject={updateProject}
                    />
                }
            />
            <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
    );
}

export default App; 