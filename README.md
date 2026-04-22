# DevOps Capstone Project: Full-Stack CI/CD Pipeline & Game App

[![Live Application](https://img.shields.io/badge/Live-Deployment-success?style=for-the-badge&logo=amazon-aws)](http://13.203.229.213:5000/)

Welcome to the **DevOps Full-Stack capstone project**! This repository demonstrates a complete, production-ready DevOps workflow including containerization, automated CI/CD pipelines, and cloud deployment on AWS EC2. It features a fully playable, cross-platform Snake & Fruit game with mobile touch controls.

### 🚀 Live Demo
**Play the game here:** [http://13.203.229.213:5000/](http://13.203.229.213:5000/)
*(Note: This live deployment link is temporary for testing purposes and may not always be available.)*

---

## 🛠 Tech Stack

- **Game Engine (Backend & Vanilla):** Node.js, Express.js, Vanilla HTML/JS/CSS (HTML5 Canvas)
- **Frontend App (React Version):** React.js (Vite), React Hooks
- **Containerization:** Docker & Docker Hub (Multi-stage builds)
- **CI/CD:** GitHub Actions
- **Cloud Infrastructure:** Amazon EC2 (AWS)
- **Web Server:** Nginx (for React frontend container)

---

## 🏗 Architecture & Features

This project consists of multiple independently containerized services deployed together via an automated pipeline:

### 1. Dual-Interface Game Implementation
- **Responsive Mobile Controls:** The game features a built-in virtual D-Pad (Remote-like interface) using instant touch events (`pointerdown`) to ensure zero input lag on smartphones.
- **Dynamic Resolution:** Utilizes strict CSS rules (`vw` scaling) ensuring the canvas scales perfectly on any device, while capping at 400px for laptops and PCs.
- **Dual Versions:** The game is fully implemented in two different paradigms:
  1. As a lightweight vanilla Javascript/HTML app served statically via the Express Backend.
  2. As a modern, highly interactive **React.js Application** utilizing hooks (`useState`, `useRef`, `useCallback`) in the `frontend` directory.

### 2. Containerized Microservices
- **Backend Node.js Service:** Runs on port 5000 serving the API and static vanilla game assets.
- **Frontend React Service:** Built dynamically and served via a Multi-Stage Nginx Docker build optimized for production on port 80.

### 3. Automated CI/CD Pipeline
Fully automated using **GitHub Actions**.
- **Continuous Integration (CI):** Triggers on pushes to the `main` branch. Automatically builds two separate Docker images (Backend and Frontend) and securely pushes them to Docker Hub.
- **Continuous Deployment (CD):** Once CI succeeds, the CD workflow securely SSHs into the AWS EC2 instance, pulls the latest images, gracefully removes old containers, configures an internal Docker network, and deploys the new services.

---

## 📂 Project Structure

```text
📁 newDevops_v2
├── 📁 .github/workflows     # CI/CD Pipeline configurations
│   ├── ci.yml               # Builds & pushes Docker images
│   └── cd.yml               # Deploys containers to AWS EC2
├── 📁 frontend              # React.js Application (Game App version)
│   ├── 📄 Dockerfile        # Multi-stage Nginx build for React
│   └── 📁 src               # React Game source code (App.jsx)
├── 📁 public                # Static Assets for Backend (Vanilla version)
│   └── 📄 index.html        # Playable Snake Game source code
├── 📄 index.js              # Express Backend Entry Point
├── 📄 Dockerfile            # Node.js Backend Docker configuration
└── 📄 package.json          # Node.js Dependencies
```

---

## ⚙️ Local Setup & Execution

If you wish to run this repository locally to examine the infrastructure:

### Prerequisites
- [Docker](https://www.docker.com/products/docker-desktop) installed on your machine.
- [Node.js](https://nodejs.org/en/) installed (for manual non-Docker running).

### Running via Docker
1. **Clone the repository:**
   ```bash
   git clone https://github.com/RamBaranwal/DevopsClass.git
   cd DevopsClass
   ```

2. **Build and Run Backend (Vanilla Game / API):**
   ```bash
   docker build -t devops-backend .
   docker run -d -p 5000:3000 --name devops-backend devops-backend
   ```
   *The game will now be running on [http://localhost:5000](http://localhost:5000)*

3. **Build and Run Frontend (React Game):**
   ```bash
   cd frontend
   docker build -t devops-frontend .
   docker run -d -p 8080:80 --name devops-frontend devops-frontend
   ```
   *The React app will be running on [http://localhost:8080](http://localhost:8080)*

### Running Manually (Without Docker)
1. Install Backend Dependencies & Start:
   ```bash
   npm install
   npm run node
   ```
2. Install Frontend Dependencies & Start:
   ```bash
   cd frontend
   npm install
   npm run dev
   ```

---

## 👨‍💻 Author
**Ram Baranwal** 

*This repository is designed to showcase end-to-end DevOps practices, modern web architecture, and cloud deployment pipelines for examiners and developers.*
