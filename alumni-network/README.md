# Alumni Network Platform

![Alumni Network Banner](https://via.placeholder.com/1000x300.png?text=Alumni+Network+Platform)

A complete, production-ready Alumni Network Platform built using the **MERN Stack** (MongoDB, Express, React, Node.js) designed explicitly to fulfill comprehensive DevOps lifecycle and continuous integration requirements.

## 🚀 DevOps Lab Requirements Achieved

This project successfully implements the following core competencies:

- **Lab 1 (Version Control):** Fully isolated Git repository architecture ready for branching workflows.
- **Lab 2 (Containerization):** Multi-stage `Dockerfile` deployments for both the frontend (Nginx proxy) and backend (Node runtime), orchestrated seamlessly via `docker-compose`.
- **Lab 3 (Continuous Integration):** Embedded `.github/workflows/ci.yml` matrix runner asserting test-driven development structures.
- **Lab 4 (CI/CD Pipeline):** Declarative `Jenkinsfile` executing dynamic cloud pushes to Docker Hub registries mapping into remote instances.
- **Lab 5 (Full-Stack Deployment):** Nginx-proxied MERN application utilizing Docker bridge networks isolating internal MongoDB traffic securely.
- **Lab 6 (Infrastructure as Code):** `terraform/` directory mapping Hashicorp constructs dynamically building AWS EC2 Virtual Machines complete with customized security group constraints.

## 🛠 Tech Stack

- **Frontend:** React 18, React Router v6, Axios, Socket.IO Client, Vanilla CSS Variables (No Tailwind).
- **Backend:** Node.js 20, Express 5, Mongoose, Socket.IO, Multer, JSONWebToken, BcryptJS.
- **Database:** MongoDB (Containerized via Docker).
- **DevOps:** Docker, Docker Compose, Jenkins, GitHub Actions, Terraform, AWS EC2.

## 📦 Features

- **Authentication & RBAC:** Secure JWT-based Login/Registration mapping user roles (Admin, Alumni, Student).
- **Alumni Directory:** Interactive connection engine resolving connection graphs natively.
- **Real-Time Messaging:** Socket.IO integrated chat engine running asynchronously to standard HTTP traffic.
- **Job Board:** Dynamic employment tracker parsing application statuses securely.
- **Event Planning:** RSVP manager with calendar syncing mechanics.
- **Image Uploads:** `multipart/form-data` natively parsed via Multer targeting isolated Docker volumes.

## 🏗 Getting Started (Local Development)

### 1. Prerequisites
- **Docker & Docker Compose** installed and running on your system.
- **Node.js** installed locally (for running the database seeder script).

### 2. Environment Setup
Clone the repository and set up your environment configuration. The backend requires specific credentials to connect to MongoDB and sign JWTs securely:
```bash
git clone <YOUR_REPO_URL>
cd alumni-network

# Create your .env file from the provided example
cp .env.example .env
# (On Windows CMD/PowerShell: copy .env.example .env)
```

### 3. Start the Cluster via Docker Compose
We use the `.override.yml` file for local development to map code volumes continuously and expose database ports explicitly:
```bash
docker-compose -f docker-compose.yml -f docker-compose.override.yml up --build -d
```
*(You can run without `-d` if you wish to see real-time log outputs for frontend and backend traffic.)*

### 4. Database Seeding (Optional but Recommended)
To populate the application with rich demonstration data (users, jobs, events), execute the integrated seeder directly inside the isolated backend container. This completely avoids local dependency installations or Windows PowerShell execution policy errors:
```bash
docker exec alumni-network-backend-1 node seed.js
```
*This instantly enriches the active database with an Admin user, Students, FAANG Alumni, real-world Job postings, and upcoming tech Events! (Core Admin Login: `admin@alumninet.com` / `password123`)*

### 5. Access the Application
- **Frontend Dashboard:** [http://localhost:3000](http://localhost:3000)
- **Backend API Layer:** [http://localhost:5000/api](http://localhost:5000/api)

### 6. Resetting the Cluster (Tear Down)
If you wish to fully wipe the MongoDB records, application state, and container data to start completely fresh:
```bash
docker-compose -f docker-compose.yml -f docker-compose.override.yml down -v
```

## ☁️ Production Deployment (AWS / Terraform)

1. Provision the hardware using Terraform:
   ```bash
   cd terraform
   terraform init
   terraform apply
   ```
   *(Ensure you have your `alumni-prod-key` prepared in AWS)*

2. SSH into your newly created EC2 Instance and pull the repo.
3. Start the production cluster without development overrides using the static proxy mapper:
   ```bash
   docker-compose -f docker-compose.yml -f docker-compose.prod.yml up -d
   ```

## 🔐 Database Backups

To execute a live native snapshot of your database securely without downtime using the custom shell script:
```bash
./scripts/backup-db.sh
```
This drops compressed local `.gz` binaries cleanly into `db_backups/` tracking historical snapshots.
