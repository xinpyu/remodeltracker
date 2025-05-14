import React from 'react';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, BarElement } from 'chart.js';
import { Bar } from 'react-chartjs-2';

// Register ChartJS components
ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    BarElement,
    Title,
    Tooltip,
    Legend
);

function ProjectSpendingChart({ project }) {
    // Group items by type and calculate totals
    const itemsByType = project.items ? project.items.reduce((acc, item) => {
        const type = item.costType || 'Uncategorized';
        if (!acc[type]) {
            acc[type] = 0;
        }
        acc[type] += item.cost;
        return acc;
    }, {}) : {};

    // Prepare data for the chart
    const types = Object.keys(itemsByType);
    const totals = Object.values(itemsByType);

    // Generate colors for each type
    const backgroundColors = types.map((_, index) => {
        const hue = (index * 137) % 360; // Distribute colors evenly
        return `hsla(${hue}, 70%, 60%, 0.7)`;
    });

    const chartData = {
        labels: types.length > 0 ? types : ['No data'],
        datasets: [
            {
                label: 'Spending by Type',
                data: totals.length > 0 ? totals : [0],
                backgroundColor: backgroundColors,
                borderColor: backgroundColors.map(color => color.replace('0.7', '1')),
                borderWidth: 1,
            },
        ],
    };

    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top',
                display: types.length > 1,
            },
            title: {
                display: true,
                text: 'Spending Breakdown by Type',
            },
        },
        scales: {
            y: {
                beginAtZero: true,
                title: {
                    display: true,
                    text: 'Amount ($)',
                },
            },
        },
    };

    // Calculate budget usage percentage
    const budgetUsage = project.budget > 0 ? (project.spent / project.budget) * 100 : 0;

    return (
        <div className="card mb-4">
            <div className="card-header">
                <h3 className="h5 mb-0">Budget Utilization</h3>
            </div>
            <div className="card-body">
                <div className="mb-3">
                    <div className="d-flex justify-content-between mb-1">
                        <span>Budget Usage</span>
                        <span className={budgetUsage > 100 ? 'text-danger' : 'text-primary'}>
                            {budgetUsage.toFixed(1)}%
                        </span>
                    </div>
                    <div className="progress" style={{ height: '24px' }}>
                        <div
                            className={`progress-bar ${budgetUsage > 100 ? 'bg-danger' : 'bg-primary'}`}
                            style={{ width: `${Math.min(100, budgetUsage)}%` }}
                            aria-valuenow={Math.min(100, budgetUsage)}
                            aria-valuemin="0"
                            aria-valuemax="100"
                        >
                            ${project.spent.toFixed(2)} of ${project.budget.toFixed(2)}
                        </div>
                    </div>
                </div>

                {project.items && project.items.length > 0 ? (
                    <div className="spending-chart" style={{ height: '300px' }}>
                        <Bar data={chartData} options={options} />
                    </div>
                ) : (
                    <div className="text-center text-muted py-5">
                        <p>Add items to see spending breakdown</p>
                    </div>
                )}
            </div>
        </div>
    );
}

export default ProjectSpendingChart; 