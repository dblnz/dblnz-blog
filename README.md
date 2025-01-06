# SwTales

This project is a small personal blog website.
Built with React + TypeScript + Vite + TailwindCSS.

## Created with GitHub Copilot

This blog website was created with the assistance of GitHub Copilot, leveraging AI to streamline the development process and enhance productivity.

## Features

- React with TypeScript for type-safe components
- Vite for fast development and optimized builds
- TailwindCSS for responsive styling
- Markdown rendering for blog posts
- Dark/light theme support
- Static blog posts stored as Markdown files

## Running Locally

### Prerequisites

- Node.js (v16 or newer)
- npm or yarn

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

This will create optimized production files in the `./static` directory.

## Adding New Blog Posts

Blog posts are stored as Markdown files in the `src/posts/` directory. Each post is statically included in the build.

### Creating a New Post

1. Create a new Markdown file in the `src/posts/` directory. Use a filename format like `post-5-your-title.md`.

2. Add the required frontmatter at the top of your Markdown file:

   ```markdown
   ---
   id: 5
   title: "Your Blog Post Title"
   date: "Month Day, Year"
   description: "A short description of your blog post."
   readTime: "X min read"
   tags: ["Tag1", "Tag2", "Tag3"]
   ---

   # Your Blog Post Title

   Content of your blog post goes here in Markdown format.
   ```

3. Important frontmatter fields:
   - `id`: A unique numeric identifier for the post (increment from the last post)
   - `title`: The title of your blog post
   - `date`: The publication date in "Month Day, Year" format
   - `description`: A brief summary of the post
   - `readTime`: Estimated reading time (optional, will be calculated if omitted)
   - `tags`: An array of relevant tags for categorization

4. Write your blog post content in Markdown format below the frontmatter.

5. After adding a new post, restart the development server to see your changes.

### Markdown Features

Your blog posts support standard Markdown features:

- Headers (# H1, ## H2, etc.)
- **Bold** and *italic* text
- Lists (ordered and unordered)
- [Links](https://example.com)
- Images: `![Alt text](image-url)`
- Code blocks with syntax highlighting
- And more!

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
