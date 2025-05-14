import React from 'react';

function ProjectItemList({ items, onEdit, onDelete }) {
    // Function to get a specific badge color based on cost type
    const getBadgeColorForType = (type) => {
        switch (type?.toLowerCase()) {
            case 'material':
                return 'bg-info';
            case 'labor':
                return 'bg-warning';
            case 'equipment':
                return 'bg-success';
            case 'tools':
                return 'bg-primary';
            case 'permits':
                return 'bg-danger';
            case 'professional services':
                return 'bg-dark';
            case 'design':
                return 'bg-secondary';
            default:
                return 'bg-secondary'; // Default color for "Other" and undefined types
        }
    };

    if (items.length === 0) {
        return (
            <div className="card">
                <div className="card-body text-center py-5">
                    <h3 className="card-title h5 mb-3">No Items Yet</h3>
                    <p className="card-text text-muted">Add items to track costs for this project.</p>
                </div>
            </div>
        );
    }

    return (
        <div className="card">
            <div className="card-header">
                <h2 className="h5 mb-0">Project Items</h2>
            </div>

            <div className="list-group list-group-flush">
                {items.map(item => (
                    <div key={item.id} className="list-group-item">
                        <div className="d-flex justify-content-between align-items-center mb-2">
                            <h3 className="h5 mb-0">{item.name}</h3>
                            <div>
                                <button
                                    className="btn btn-sm btn-outline-primary me-1"
                                    onClick={() => onEdit(item)}
                                >
                                    Edit
                                </button>
                                <button
                                    className="btn btn-sm btn-outline-danger"
                                    onClick={() => onDelete(item.id)}
                                >
                                    Delete
                                </button>
                            </div>
                        </div>

                        <div className="d-flex flex-wrap mb-2 gap-2">
                            {item.costType && (
                                <span className={`badge ${getBadgeColorForType(item.costType)} badge-type`}>
                                    {item.costType}
                                </span>
                            )}
                            <span className="badge bg-primary">
                                ${item.cost.toFixed(2)}
                            </span>
                        </div>

                        {item.description && (
                            <p className="text-muted mb-0 small">
                                {item.description}
                            </p>
                        )}
                    </div>
                ))}
            </div>

            <div className="card-footer bg-light">
                <div className="d-flex justify-content-between align-items-center">
                    <span><strong>Total Items:</strong> {items.length}</span>
                    <span>
                        <strong>Total Cost:</strong> ${items.reduce((total, item) => total + item.cost, 0).toFixed(2)}
                    </span>
                </div>
            </div>
        </div>
    );
}

export default ProjectItemList; 