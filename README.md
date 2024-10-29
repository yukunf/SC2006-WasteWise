
# WasteWise♻️

Welcome to the repository for NTU SC2006 Software Engineering group project WasteWise.

WasteWise is an innovative platform designed to connect the public with licensed waste collectors by offering easy access to essential information on waste disposal services. The project aims to facilitate environmental awareness, promote responsible waste management, and support regulatory bodies in monitoring industry compliance.

This project applies software engineering best practices, prioritizing security, user experience, and performance to ensure a sustainable and reliable platform for future enhancements.

----

This is a web application built with Django (backend) and React (frontend). This README will guide you through setting up the development environment, installing dependencies, and running both the backend and frontend servers.

## Prerequisites

- [Python 3.x](https://www.python.org/downloads/) installed
- [Node.js and npm](https://nodejs.org/) installed
- [pip](https://pip.pypa.io/en/stable/) (comes with Python)

## Table of Contents

1. [Setup Instructions](#setup-instructions)
2. [Running the Django Backend](#running-the-django-backend)
3. [Running the React Frontend](#running-the-react-frontend)
4. [Troubleshooting](#troubleshooting)
5. [Project Run Through](#Project-Run-through)

---

## Setup Instructions

### 1. Clone the Repository

```bash
git clone https://github.com/yukunf/SC2006-WasteWise.git
cd SC2006-WasteWise
```

### 2. Setting Up the Python Environment

#### Create a Virtual Environment

First, create and activate a virtual environment for Python:

```bash
# On macOS / Linux
python3 -m venv venv
source venv/bin/activate

# On Windows
python -m venv venv
venv\Scripts\activate
```

#### Install Python Dependencies

Once the virtual environment is active, install the required packages:

```bash
pip install -r requirements.txt
```

### 3. Setting Up the React Environment

Navigate to the React app directory (e.g., `frontend/`) and install dependencies:

```bash
cd frontend
npm install
```

## Running the Django Backend

1. **Database Migrations**

   Run the migrations to set up your database:

   ```bash
   python manage.py migrate
   ```

2. **Start the Django Development Server**

   ```bash
   python manage.py runserver
   ```

   The backend will be available at `http://localhost:8000`.

## Running the React Frontend

After installing the dependencies in the `frontend/` directory, start the development server:

```bash
npm start
```

This will start the React app, typically available at `http://localhost:3000`.

## Troubleshooting

- If `npm install` fails, try updating `Node.js` and `npm` to the latest versions.
- Ensure the virtual environment is activated when running backend-related commands.
- If you encounter any other issues, check the error messages for details, or consult the project's issues on GitHub.

-------
# Project Run through
Here’s a brief overview of this project structure, which you can include in your README to help contributors understand the file organization:

---

## Project Structure

```plaintext
.
├── client/                     # Frontend React application
│   ├── build/                  # Production build files
│   │   └── static/             # Static assets for CSS, JS, media files
│   ├── public/                 # Public assets such as index.html, favicon
│   └── src/                    # React source code
│       ├── components/         # Reusable React components
│       ├── images/             # Image assets
│       └── pages/              # Page components
├── deliverables/               # Project deliverables for labs and diagrams
│   ├── Lab1/                   # UI Mockups
│   ├── Lab2/                   # Sequence Diagrams
│   └── Lab3/                   # Additional diagrams
├── doc/                        # Documentation and additional resources
├── server/                     # Backend Django application
│   ├── collector/              # Collector app with models and views
│   ├── rating/                 # Rating app including templates and logic
│   ├── report/                 # Reporting module for the application
│   └── user/                   # User management and authentication
├── venv/                       # Virtual environment for Python dependencies
└── .idea/                      # IDE configuration (optional for development)
```

### Brief Explanation of Key Directories:

- **client/**: Contains all frontend files. The main source code for the React app is in `src/`, while static files generated after building the app are in `build/`.
- **deliverables/**: Stores various lab and design-related deliverables, including UI mockups and sequence diagrams.
- **doc/**: General project documentation.
- **server/**: Contains all backend logic and individual Django apps (`collector`, `rating`, `report`, `user`). Each app includes subdirectories like `migrations` for database versioning.
- **venv/**: Python virtual environment to manage dependencies locally.

