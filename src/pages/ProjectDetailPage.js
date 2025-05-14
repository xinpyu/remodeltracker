import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import ProjectItemForm from '../components/ProjectItemForm';
import ProjectItemList from '../components/ProjectItemList';
import ProjectSpendingChart from '../components/ProjectSpendingChart';

function ProjectDetailPage({ projects, updateProject }) {
    const { projectId } = useParams();
    const navigate = useNavigate();
    const [project, setProject] = useState(null);
    const [editingItem, setEditingItem] = useState(null);

    // Find the project by ID when component mounts or projectId changes
    useEffect(() => {
        const foundProject = projects.find(p => p.id === projectId);
        if (foundProject) {
            // Initialize items array if it doesn't exist
            if (!foundProject.items) {
                foundProject.items = [];
            }
            setProject(foundProject);
        } else {
            // Redirect to projects list if project not found
            navigate('/');
        }
    }, [projectId, projects, navigate]);

    // Handle adding or updating an item
    const saveItem = (item) => {
        if (!project) return;

        let updatedItems;

        if (editingItem) {
            // Update existing item
            updatedItems = project.items.map(i =>
                i.id === item.id ? item : i
            );
            setEditingItem(null);
        } else {
            // Add new item with unique ID
            updatedItems = [...project.items, { ...item, id: Date.now().toString() }];
        }

        // Calculate total spent based on all items
        const totalSpent = updatedItems.reduce((sum, item) => sum + Number(item.cost), 0);

        // Update the project with new items and total spent
        const updatedProject = {
            ...project,
            items: updatedItems,
            spent: totalSpent
        };

        setProject(updatedProject);
        updateProject(updatedProject);
    };

    // Handle deleting an item
    const deleteItem = (itemId) => {
        if (!project) return;

        const updatedItems = project.items.filter(item => item.id !== itemId);

        // Recalculate total spent
        const totalSpent = updatedItems.reduce((sum, item) => sum + Number(item.cost), 0);

        // Update the project
        const updatedProject = {
            ...project,
            items: updatedItems,
            spent: totalSpent
        };

        setProject(updatedProject);
        updateProject(updatedProject);
    };

    // Set an item for editing
    const editItem = (item) => {
        setEditingItem(item);
    };

    // Return to projects list
    const goBack = () => {
        navigate('/');
    };

    if (!project) {
        return <div className="container py-5 text-center">Loading...</div>;
    }

    return (
        <div className="container py-4">
            <header className="mb-4">
                <button className="btn btn-outline-secondary mb-2" onClick={goBack}>
                    &larr; Back to Projects
                </button>
                <h1 className="mb-2">{project.name}</h1>
                <div className="d-flex flex-wrap gap-3 mb-2">
                    <div><strong>Budget:</strong> ${project.budget.toFixed(2)}</div>
                    <div><strong>Spent:</strong> ${project.spent.toFixed(2)}</div>
                    <div className={`${project.budget - project.spent < 0 ? 'text-danger' : 'text-success'}`}>
                        <strong>Remaining:</strong> ${(project.budget - project.spent).toFixed(2)}
                    </div>
                </div>
            </header>

            <div className="row">
                <div className="col-lg-8 order-lg-2">
                    <ProjectSpendingChart project={project} />
                    <ProjectItemList
                        items={project.items || []}
                        onEdit={editItem}
                        onDelete={deleteItem}
                    />
                </div>

                <div className="col-lg-4 order-lg-1 mb-4">
                    <div className="card sticky-top" style={{ top: '20px' }}>
                        <div className="card-body">
                            <h2 className="card-title h5">{editingItem ? 'Update Item' : 'Add New Item'}</h2>
                            <ProjectItemForm
                                onSave={saveItem}
                                editingItem={editingItem}
                                onCancel={() => setEditingItem(null)}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ProjectDetailPage; 