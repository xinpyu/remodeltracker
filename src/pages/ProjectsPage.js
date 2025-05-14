import React from 'react';
import { useNavigate } from 'react-router-dom';
import ProjectForm from '../components/ProjectForm';
import ProjectList from '../components/ProjectList';

function ProjectsPage({ projects, editingProject, setEditingProject, saveProject, deleteProject, editProject, children }) {
    const navigate = useNavigate();

    // Handler for viewing project details
    const viewProjectDetails = (projectId) => {
        navigate(`/project/${projectId}`);
    };

    return (
        <div className="container py-4">
            <header className="mb-4 text-center">
                <h1>Remodeling Cost Tracker</h1>
            </header>

            <div className="row">
                <div className="col-md-4 mb-4">
                    <div className="card mb-4">
                        <div className="card-body">
                            <h2 className="card-title h5">{editingProject ? 'Update Project' : 'Add New Project'}</h2>
                            <ProjectForm
                                onSave={saveProject}
                                editingProject={editingProject}
                                onCancel={() => setEditingProject(null)}
                            />
                        </div>
                    </div>

                    {/* Render the export/import component if provided */}
                    {children}
                </div>

                <div className="col-md-8">
                    <ProjectList
                        projects={projects}
                        onEdit={editProject}
                        onDelete={deleteProject}
                        onView={viewProjectDetails}
                    />
                </div>
            </div>
        </div>
    );
}

export default ProjectsPage; 