import React from 'react';
import ProjectItem from './ProjectItem';

function ProjectList({ projects, onEdit, onDelete, onView }) {
    if (projects.length === 0) {
        return (
            <div className="card">
                <div className="card-body text-center py-5">
                    <h3 className="card-title h5 mb-3">No Projects Yet</h3>
                    <p className="card-text text-muted">Add your first remodeling project to get started!</p>
                </div>
            </div>
        );
    }

    return (
        <div className="card">
            <div className="card-header">
                <h2 className="h5 mb-0">Your Projects</h2>
            </div>
            <div className="list-group list-group-flush">
                {projects.map(project => (
                    <ProjectItem
                        key={project.id}
                        project={project}
                        onEdit={onEdit}
                        onDelete={onDelete}
                        onView={onView}
                    />
                ))}
            </div>

            <div className="card-footer bg-light">
                <div className="d-flex justify-content-between align-items-center">
                    <span><strong>Total Projects:</strong> {projects.length}</span>
                    <span>
                        <strong>Total Budget:</strong> ${projects.reduce((total, project) => total + project.budget, 0).toFixed(2)}
                    </span>
                </div>
            </div>
        </div>
    );
}

export default ProjectList; 