# Blog Frontend

This project is a small frontend for my personal blog.
Built with React + TypeScript + Vite + TailwindCSS.

## Features

- React with TypeScript for type-safe components
- Vite for fast development and optimized builds
- TailwindCSS for responsive styling
- Markdown rendering for blog posts
- Dark/light theme support

## Running Locally

### Prerequisites

- Node.js (v16 or newer)
- npm or yarn
- Backend server running (see backend README)

### Installation

1. Install dependencies:
   ```bash
   npm install
   ```

2. Start the development server:
   ```bash
   npm run dev-fe
   ```
   
   This will start the frontend application only. To run both frontend and backend concurrently:
   ```bash
   npm run dev
   ```

3. Open your browser and navigate to `http://localhost:5173`

### Building for Production

```bash
npm run build
```

This will create optimized production files in the `../static` directory.

## Running with Docker

### Prerequisites

- Docker

### Building and Running the Docker Image

1. Build the Docker image:
   ```bash
   docker build -t dblnz-blog-frontend .
   ```

2. Run the container:
   ```bash
   docker run -p 8080:80 dblnz-blog-frontend
   ```

3. Open your browser and navigate to `http://localhost:8080`

### Docker Compose (Optional)

If you want to run both frontend and backend together with Docker Compose, you can create a docker-compose.yml file at the root of the project.

## Deployment

To deploy the application:

```bash
npm run deploy
```

This command builds the frontend and deploys the backend using Shuttle.
