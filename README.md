# TrackReno

A comprehensive web application for tracking renovation budget and costs. TrackReno allows users to create and manage multiple remodeling projects and track budget vs. actual spending at both the project and task level.

Visit [https://trackreno.com](https://trackreno.com) to use the application.

## Features

- **Project Management**
  - Create, update, and delete remodeling projects
  - Set budget amounts for each project
  - View a list of all projects with budget status
  - Track overall spending across all projects

- **Task/Item Management**
  - Add individual items/tasks within each project
  - Categorize costs by user-defined types (materials, labor, etc.)
  - Track costs for each item/task 
  - Automatically calculate total spending for the project
  - Document item details with descriptions

- **Budget Tracking & Visualization**
  - Visual progress bars for budget usage
  - Interactive spending breakdown chart by cost type
  - Color-coded indicators for remaining budget
  - Summary statistics for both projects and items

- **Data Backup & Privacy**
  - All data persists in browser localStorage for privacy
  - Export/import data in CSV format for backup
  - No account required - single user experience
  - No server-side data storage - your data stays on your device

## Development

1. Clone this repository
2. Install dependencies:
   ```
   npm install
   ```
3. Start the development server:
   ```
   npm start
   ```
4. Open your browser to: http://localhost:1234

## Usage

### Projects Overview
- **Add a New Project**: Fill out the form with project name and budget
- **View Project Details**: Click "View Details" on any project to see its items
- **Update a Project**: Click "Edit" to modify a project's details
- **Delete a Project**: Click "Delete" to remove a project and all its items

### Project Details
- **Add Items**: Create new cost items for the selected project
- **Categorize Expenses**: Assign a cost type to each item (material, labor, etc.)
- **Track Expenses**: See how individual expenses add up to the total spent
- **Visualize Data**: View spending breakdown chart by cost type
- **Manage Items**: Edit or delete individual expense items
- **Return to Projects**: Click "Back to Projects" to return to the main list

## Technologies Used

- React.js
- React Router
- Chart.js for data visualization
- Bootstrap 5
- LocalStorage for data persistence
- Parcel for bundling

## Privacy & Security

TrackReno is designed with privacy in mind. All your project data is stored locally in your browser and never sent to any server. You can export your data anytime for backup purposes. 