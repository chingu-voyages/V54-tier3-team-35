## Backend Setup

### Prerequisites  
- Install **PostgreSQL** if you haven’t already.  
- Ensure **Node.js** and **npm** are installed.  

### Setup  

1. **Configure Environment Variables**  
   - Navigate to the `/backend` directory. cd backend 
   - Create a `.env` file in the `/backend` directory and add the following variables, updating them according to your PostgreSQL setup:  

     ```
     DB_HOST=localhost
     DB_USER=postgres
     DB_PASSWORD={your_password}
     DB_NAME=database
     DB_PORT=5432
     SECRET_KEY={some_secret_key}
     GEMINI_API_KEY={some_secret_key}
     GEMINI_MODEL=gemini-1.5-flash
     NODE_ENV=development
     CORS_ORIGINS_PROD=https://staging-askiq.netlify.app,https://askiq-live.netlify.app,http://localhost:3000,http://localhost:5173
     CORS_ORIGINS_DEV=http://localhost:3000,http://localhost:5173
     ```

2. **Initialize the Database**  
   - Run the following command inside the `/backend` directory to create the database and tables:  
     ```sh
     psql -U postgres -f src/setup.sql
     ```

3. **Start the Backend**  
   - In the `/backend` directory, run:  
     ```sh
     npm run dev
     ```  

### Backend URL  
Once running, the backend will be available at:  
**[http://localhost:3000](http://localhost:3000)**  


### API Documentation  

When NODE_ENV=development, See the API documentation at **[http://localhost:3000/api-docs/](http://localhost:3000/api-docs/)**  
