import React, { useState, useEffect } from 'react';

function ProjectForm({ onSave, editingProject, onCancel }) {
    const [project, setProject] = useState({
        name: '',
        budget: '',
        spent: '0'
    });
    const [errors, setErrors] = useState({});

    // When editingProject changes, update the form
    useEffect(() => {
        if (editingProject) {
            setProject(editingProject);
        } else {
            // Reset form when not editing
            setProject({
                name: '',
                budget: '',
                spent: '0'
            });
        }
    }, [editingProject]);

    const validate = () => {
        const newErrors = {};

        if (!project.name.trim()) {
            newErrors.name = 'Project name is required';
        }

        if (!project.budget || isNaN(project.budget) || Number(project.budget) <= 0) {
            newErrors.budget = 'Budget must be a positive number';
        }

        if (!project.spent || isNaN(project.spent) || Number(project.spent) < 0) {
            newErrors.spent = 'Amount spent must be a non-negative number';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setProject(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (validate()) {
            // Convert string values to numbers for budget and spent
            const formattedProject = {
                ...project,
                budget: Number(project.budget),
                spent: Number(project.spent)
            };

            onSave(formattedProject);

            // Reset form if not editing
            if (!editingProject) {
                setProject({
                    name: '',
                    budget: '',
                    spent: '0'
                });
            }
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <div className="mb-3">
                <label htmlFor="name" className="form-label">Project Name</label>
                <input
                    type="text"
                    className={`form-control ${errors.name ? 'is-invalid' : ''}`}
                    id="name"
                    name="name"
                    value={project.name}
                    onChange={handleChange}
                    placeholder="Kitchen Renovation"
                />
                {errors.name && <div className="invalid-feedback">{errors.name}</div>}
            </div>

            <div className="mb-3">
                <label htmlFor="budget" className="form-label">Budget ($)</label>
                <input
                    type="number"
                    className={`form-control ${errors.budget ? 'is-invalid' : ''}`}
                    id="budget"
                    name="budget"
                    value={project.budget}
                    onChange={handleChange}
                    placeholder="5000"
                    min="0"
                    step="0.01"
                />
                {errors.budget && <div className="invalid-feedback">{errors.budget}</div>}
            </div>

            <div className="mb-3">
                <label htmlFor="spent" className="form-label">Amount Spent ($)</label>
                <input
                    type="number"
                    className={`form-control ${errors.spent ? 'is-invalid' : ''}`}
                    id="spent"
                    name="spent"
                    value={project.spent}
                    onChange={handleChange}
                    placeholder="0"
                    min="0"
                    step="0.01"
                />
                {errors.spent && <div className="invalid-feedback">{errors.spent}</div>}
            </div>

            <div className="d-flex gap-2">
                <button type="submit" className="btn btn-primary">
                    {editingProject ? 'Update Project' : 'Add Project'}
                </button>

                {editingProject && (
                    <button
                        type="button"
                        className="btn btn-outline-secondary"
                        onClick={onCancel}
                    >
                        Cancel
                    </button>
                )}
            </div>
        </form>
    );
}

export default ProjectForm; 