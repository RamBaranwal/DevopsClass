# DevOps Capstone Project: Full-Stack CI/CD Pipeline & Game App

[![Live Application](https://img.shields.io/badge/Live-Deployment-success?style=for-the-badge&logo=amazon-aws)](http://13.203.229.213:5000/)

Welcome to the **DevOps Full-Stack capstone project**! This repository demonstrates a complete, production-ready DevOps workflow including containerization, automated CI/CD pipelines, and cloud deployment on AWS EC2. It features a full-stack environment alongside a fully playable Snake & Fruit game.

### 🚀 Live Demo
**Play the game here:** [http://13.203.229.213:5000/](http://13.203.229.213:5000/)

---

## 🛠 Tech Stack

- **Backend / Game Engine:** Node.js, Express.js, Vanilla HTML/JS/CSS (HTML5 Canvas)
- **Frontend App:** React.js (Vite)
- **Containerization:** Docker & Docker Hub (Multi-stage builds)
- **CI/CD:** GitHub Actions
- **Cloud Infrastructure:** Amazon EC2 (AWS)
- **Web Server:** Nginx (for React frontend)

---

## 🏗 Architecture & Features

This project consists of multiple independently containerized services deployed together via an automated pipeline:

### 1. The Game Server (Backend)
- A Node.js & Express server acting as the backend.
- Serves a **Snake & Fruit Game** built cleanly using HTML5 Canvas.
- Includes dynamic controls, score tracking, restart mechanics, and modern emoji visuals (🍎 & 🐍).
- Structured efficiently by separating the HTML/JS frontend into a static `public` directory.

### 2. React Application (Frontend)
- A scalable React application scaffolded with Vite.
- Optimized for production via a **Multi-Stage Docker Build** utilizing Nginx to serve static assets efficiently.

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
├── 📁 frontend              # React.js Application
│   ├── 📄 Dockerfile        # Multi-stage Nginx build for React
│   └── 📄 ... (React source files)
├── 📁 public                # Static Assets for Backend
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

2. **Build and Run Backend (Game):**
   ```bash
   docker build -t devops-backend .
   docker run -d -p 3000:3000 --name devops-backend devops-backend
   ```
   *The game will now be running on [http://localhost:3000](http://localhost:3000)*

3. **Build and Run Frontend (React):**
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
