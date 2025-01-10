# Full-Stack TODO App

A simple todo app that demonstrates the use of DOM manipulation in JavaScript. The app allows users to add, delete, and mark todos as completed.
The frontend is written in HTML, CSS, and JavaScript. The backend is written in Node.js and Express.

## Prerequisites

- MongoDB
- Node.js
- pnpm

## Setup

### Backend

1. Go inside the `backend` directory and run:

```bash
pnpm install
```

2. Copy `.env.example` to `.env`.

```bash
cp .env.example .env
```

3. Run the server.

```bash
pnpm start
```

4. Check if the server is running by visiting `http://localhost:5000/healthy` in your browser.

### Frontend

1. Go inside the `frontend` directory and run:

```bash
pnpm install
```

2. Start the frontend.

```bash
pnpm dev
```

3. Open `http://localhost:5173` in your browser.
