import React, { useState, useEffect } from 'react';

// Common cost types for remodeling projects - moved outside component
const COST_TYPES = [
    'Material',
    'Labor',
    'Equipment',
    'Tools',
    'Permits',
    'Professional Services',
    'Design',
    'Other'
];

function ProjectItemForm({ onSave, editingItem, onCancel }) {
    const [item, setItem] = useState({
        name: '',
        description: '',
        cost: '0',
        costType: '',
        customType: ''
    });
    const [errors, setErrors] = useState({});

    // When editingItem changes, update the form
    useEffect(() => {
        if (editingItem) {
            // If the item has a cost type that's not in our list, set it to "Other" and store the custom type
            if (editingItem.costType && !COST_TYPES.includes(editingItem.costType)) {
                setItem({
                    ...editingItem,
                    customType: editingItem.costType,
                    costType: 'Other'
                });
            } else {
                setItem(editingItem);
            }
        } else {
            // Reset form when not editing
            setItem({
                name: '',
                description: '',
                cost: '0',
                costType: '',
                customType: ''
            });
        }
    }, [editingItem]); // Removed costTypes from dependency array

    const validate = () => {
        const newErrors = {};

        if (!item.name.trim()) {
            newErrors.name = 'Item name is required';
        }

        if (!item.cost || isNaN(item.cost) || Number(item.cost) < 0) {
            newErrors.cost = 'Cost must be a non-negative number';
        }

        if (item.costType === 'Other' && !item.customType.trim()) {
            newErrors.customType = 'Please specify a cost type';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setItem(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (validate()) {
            // Convert string values to numbers for cost
            const formattedItem = {
                ...item,
                cost: Number(item.cost),
                // Use the custom type if "Other" is selected
                costType: item.costType === 'Other' ? item.customType : item.costType
            };

            // Remove the customType field before saving
            delete formattedItem.customType;

            onSave(formattedItem);

            // Reset form if not editing
            if (!editingItem) {
                setItem({
                    name: '',
                    description: '',
                    cost: '0',
                    costType: '',
                    customType: ''
                });
            }
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <div className="mb-3">
                <label htmlFor="name" className="form-label">Item Name</label>
                <input
                    type="text"
                    className={`form-control ${errors.name ? 'is-invalid' : ''}`}
                    id="name"
                    name="name"
                    value={item.name}
                    onChange={handleChange}
                    placeholder="Paint"
                />
                {errors.name && <div className="invalid-feedback">{errors.name}</div>}
            </div>

            <div className="mb-3">
                <label htmlFor="costType" className="form-label">Cost Type</label>
                <select
                    className="form-select"
                    id="costType"
                    name="costType"
                    value={item.costType}
                    onChange={handleChange}
                >
                    <option value="" disabled>Select a type...</option>
                    {COST_TYPES.map(type => (
                        <option key={type} value={type}>{type}</option>
                    ))}
                </select>
            </div>

            {item.costType === 'Other' && (
                <div className="mb-3">
                    <label htmlFor="customType" className="form-label">Specify Cost Type</label>
                    <input
                        type="text"
                        className={`form-control ${errors.customType ? 'is-invalid' : ''}`}
                        id="customType"
                        name="customType"
                        value={item.customType}
                        onChange={handleChange}
                        placeholder="Enter custom cost type"
                    />
                    {errors.customType && <div className="invalid-feedback">{errors.customType}</div>}
                </div>
            )}

            <div className="mb-3">
                <label htmlFor="description" className="form-label">Description</label>
                <textarea
                    className="form-control"
                    id="description"
                    name="description"
                    value={item.description}
                    onChange={handleChange}
                    placeholder="Details about this item"
                    rows="2"
                ></textarea>
            </div>

            <div className="mb-3">
                <label htmlFor="cost" className="form-label">Cost ($)</label>
                <input
                    type="number"
                    className={`form-control ${errors.cost ? 'is-invalid' : ''}`}
                    id="cost"
                    name="cost"
                    value={item.cost}
                    onChange={handleChange}
                    placeholder="0"
                    min="0"
                    step="0.01"
                />
                {errors.cost && <div className="invalid-feedback">{errors.cost}</div>}
            </div>

            <div className="d-flex gap-2">
                <button type="submit" className="btn btn-primary">
                    {editingItem ? 'Update Item' : 'Add Item'}
                </button>

                {editingItem && (
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

export default ProjectItemForm; 