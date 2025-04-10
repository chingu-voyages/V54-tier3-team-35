## Backend Setup

### Prerequisites  
- **PostgreSQL** installed  
- **Node.js** and **npm** installed  
- **Docker** & **Docker Compose** 

### Setup  

1. **Configure Environment Variables**  
  - Navigate to the `/backend` directory:
     ```bash
     cd backend
     ```
- Create a .env file in the `/backend` directory and add the following variables, updating them according to your PostgreSQL setup:  

     ```
     DB_HOST=localhost
     DB_USER=postgres
     DB_PASSWORD={YOUR_POSTGRES_PASSWORD}
     DB_NAME=database
     DB_PORT=5432
     SECRET_KEY={YOUR_SECRET_JWT_KEY}
     GEMINI_API_KEY={YOUR_GEMINI_API_KEY}
     GEMINI_MODEL=gemini-1.5-flash
     NODE_ENV=development
     CORS_ORIGINS_PROD=https://staging-askiq.netlify.app,https://askiq-live.netlify.app,http://localhost:3000,http://localhost:5173
     CORS_ORIGINS_DEV=http://localhost:3000,http://localhost:5173
     ```

2. **Run Docker Compose**  
   - From the root of the project (where the `docker-compose.yml` file is located), run the following command to build and start the containers for the database, backend, and frontend:

     ```bash
     docker-compose up --build
     ```

   - Docker Compose will automatically:
     - Set up the PostgreSQL database.
     - Run the backend API.
     - Start the frontend application.
     - Run the `setup.sql` script to initialize the database.


### Backend URL  
Once running, the backend will be available at:  
**[http://localhost:3000](http://localhost:3000)**  

### Frontend URL
Once running, the frontend will be available at:
**[http://localhost:5173](http://localhost:5173)**


### API Documentation  

When NODE_ENV=development, See the API documentation at **[http://localhost:3000/api-docs/](http://localhost:3000/api-docs/)**  
