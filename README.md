# TAG Cloud Project: Online Compiler & Interview Platform

## 1) System Architecture (Microservices)

### Goals
- Secure, scalable multi-language code execution.
- Real-time collaboration and interview features.
- Clean separation of concerns for development and deployment.

### High-Level Components
- **API Gateway** (Node.js + Express)
  - Routes requests to services
  - JWT auth validation
  - Rate limiting / WAF-style protections
- **Auth Service** (Node.js + Express + MongoDB)
  - User signup/login
  - Role management (Candidate, Interviewer/Admin)
  - JWT issuance & refresh tokens
- **Execution Service** (Node.js + Express)
  - Compiles/runs code in **isolated Docker sandboxes**
  - Enforces CPU/memory/time limits
  - Returns stdout/stderr/compile/runtime errors
- **Submission Service** (Node.js + Express + MongoDB)
  - Stores submissions (code, language, input, output, timestamp)
- **Interview Service** (Node.js + Socket.io)
  - Real-time collaborative editor
  - Interview room orchestration
  - Lock/unlock editor, run code
- **Frontend** (React + Tailwind + Monaco Editor)
  - Editor with language selector
  - Custom input and output console
  - Interview room UI

### Data Stores
- **MongoDB**
  - Users
  - Submissions
  - Interviews
- **Redis (optional)**
  - Session caching
  - Rate limiting
  - Queue for execution jobs

### Observability
- **Centralized logging** (e.g., ELK / Loki)
- **Metrics** (Prometheus + Grafana)
- **Tracing** (OpenTelemetry)

### Execution Flow (Simplified)
1. User submits code from frontend.
2. API Gateway validates JWT + rate limits.
3. Request forwarded to Execution Service.
4. Execution Service compiles/runs inside Docker sandbox.
5. Results returned to frontend and stored in Submission Service.

---

## 2) Folder Structure (Microservices)

```
TAG_Cloud_Project/
├── services/
│   ├── api-gateway/
│   ├── auth-service/
│   ├── execution-service/
│   ├── submission-service/
│   └── interview-service/
├── frontend/
│   ├── src/
│   ├── public/
│   └── package.json
├── shared/
│   ├── config/
│   ├── constants/
│   ├── middleware/
│   └── utils/
├── infra/
│   ├── docker/
│   ├── k8s/
│   └── terraform/
└── README.md
```

---

## 3) Simplified Architecture (College Project)

For a college project, reduce complexity to speed up development:

### Simplified Components
- **Single Backend (Node.js + Express)**
  - Auth routes
  - Code execution routes
  - Submission routes
  - Interview Socket.io
- **Frontend** (React + Tailwind + Monaco)
- **Database** (MongoDB)
- **Execution**
  - Use secure child_process for simplicity OR Docker if available
  - Still enforce timeouts and memory limits where possible

### Simplified Folder Structure
```
TAG_Cloud_Project/
├── backend/
│   ├── src/
│   │   ├── controllers/
│   │   ├── routes/
│   │   ├── services/
│   │   ├── models/
│   │   └── middleware/
│   └── package.json
├── frontend/
│   ├── src/
│   └── package.json
└── README.md
```

---

## 4) Recommended Next Steps
1. Initialize monorepo structure.
2. Scaffold backend services (auth, execution, submissions, interviews).
3. Implement Docker sandbox for code execution.
4. Build frontend editor + output console.
5. Add Socket.io for interview mode.
6. Add testing & CI pipeline.

---

✅ This document provides the **architecture + folder structure** required as a starting point. Next, backend and frontend implementation can be added incrementally.
