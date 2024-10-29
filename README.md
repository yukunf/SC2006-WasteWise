
# WasteWise

> Short Briefing

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
