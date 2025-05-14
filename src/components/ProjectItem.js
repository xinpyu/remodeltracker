import React from 'react';

function ProjectItem({ project, onEdit, onDelete, onView }) {
    const { id, name, budget, spent } = project;
    const remaining = budget - spent;

    // Determine color for remaining amount
    const getRemainingClass = () => {
        if (remaining < 0) return 'text-danger';
        if (remaining <= budget * 0.1) return 'text-warning';
        return 'text-success';
    };

    return (
        <div className="list-group-item">
            <div className="d-flex justify-content-between align-items-center mb-2">
                <h3 className="h5 mb-0">{name}</h3>
                <div className="btn-group">
                    <button
                        className="btn btn-sm btn-primary"
                        onClick={() => onView(id)}
                    >
                        View Details
                    </button>
                    <button
                        className="btn btn-sm btn-outline-primary"
                        onClick={() => onEdit(project)}
                    >
                        Edit
                    </button>
                    <button
                        className="btn btn-sm btn-outline-danger"
                        onClick={() => onDelete(id)}
                    >
                        Delete
                    </button>
                </div>
            </div>

            <div className="row g-2 mb-2">
                <div className="col-md-4">
                    <div className="d-flex flex-column">
                        <small className="text-muted">Budget</small>
                        <span className="fw-bold">${budget.toFixed(2)}</span>
                    </div>
                </div>

                <div className="col-md-4">
                    <div className="d-flex flex-column">
                        <small className="text-muted">Spent</small>
                        <span className="fw-bold">${spent.toFixed(2)}</span>
                    </div>
                </div>

                <div className="col-md-4">
                    <div className="d-flex flex-column">
                        <small className="text-muted">Remaining</small>
                        <span className={`fw-bold ${getRemainingClass()}`}>
                            ${remaining.toFixed(2)}
                        </span>
                    </div>
                </div>
            </div>

            {/* Progress bar for budget usage */}
            <div className="progress" style={{ height: '10px' }}>
                <div
                    className={`progress-bar ${remaining < 0 ? 'bg-danger' : 'bg-primary'}`}
                    style={{ width: `${Math.min(100, (spent / budget) * 100)}%` }}
                    aria-valuenow={Math.min(100, (spent / budget) * 100)}
                    aria-valuemin="0"
                    aria-valuemax="100"
                ></div>
            </div>
        </div>
    );
}

export default ProjectItem; 