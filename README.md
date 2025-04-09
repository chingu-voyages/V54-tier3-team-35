## AskIQ 🤖👨‍💻

## Project Overview 📚

AskIQ is an interactive AI GPT application that utilizes the Google Gemini API to handle user queries. It is based on a pentagram-style input form designed to tailor custom queries, which the model can respond to, edit, or use to generate new queries.

## Project Features/Functionalities ⚙️

AskIQ includes fundamental features and functionalities that make it unique and distinctive from other AI models:

 1. A JWT-based user authentication system, where passwords are hashed and securely stored in the database.

 2. A GIF animation showcasing the app in action for both desktop and mobile users.

 3. A submit button integrated with the pentagram form to interact with the AI model.

 4. An option to edit a previous response or create a new one, offering flexibility and ease of use.

 5. Validation and error handling for empty fields in the pentagram form.

 6. A result area displaying the AI model's response for users to view and read.

## Project Dependencies 🔗

AskIQ uses several external resources to function and deploy properly:

 1. Node.js

 2. PostgreSQL

## How to Use the AskIQ App 📃

Follow these steps to run the app on your system:

Step 1: Get a Gemini API key from: https://ai.google.dev/gemini-api/docs/api-key

Step 2: Create a .env file in the backend directory with the following contents:

 * `DB_HOST`=localhost
   
 * `DB_USER`=postgres
   
 * `DB_PASSWORD`={YOUR-POSTGRES-PASSWORD}
    
 * `DB_NAME`=database
   
* `DB_PORT`=5432
    
 * `SECRET_KEY`={YOUR-SECRET-JWT-KEY}
     
 * `GEMINI_API_KEY`={YOUR-SECRET-GEMINI-KEY}
   
 * `GEMINI_MODEL`=gemini-1.5-flash
   
 * `DATABASE_URL`={YOUR-PROD-POSTGRESQL-DB}
   
 * `NODE_ENV`=development
   
 * `CORS_ORIGINS_PROD`={YOUR_PROD_CORS_ORIGINS}
     
 * `CORS_ORIGINS_DEV`=http://localhost:3000,http://localhost:5173  

Step 3: cd backend

Step 4: Add psql to PATH (if you're on Windows)

Step 5: Run the following command to create the database and tables:

`psql -U postgres -f src/setup.sql`

Step 6: Start the backend: npm run dev

Step 7: cd client

Step 8: Install dependencies:npm install

Step 9: Start the frontend: npm run dev

Step 10: The frontend will be available at: http://localhost:5173/

## App Video Overview 📽️

![App demo - Desktop](/client/public/desktop_gif.gif)

## Our Team 👱🏻‍♀️👩🏻‍🦰👩🏻👧🏽👧🏾

- Doris John Primary Scrum Master #1: [GitHub](https://github.com/Djohn25) / [LinkedIn](https://www.linkedin.com/in/dorisukpejohn/) / [Email](Jsecus23@gmail.com)
- VICTORIA IDRIS SHADOW SCRUM MASTER #2: [GitHub](https://github.com/VICTORIAIDRIS) / [LinkedIn](https://linkedin.com/in/VICTORIA-IDRIS-7847A1177) / [Email](UNEKWUIDRIS@GMAIL.COM)
- Ahmed Sohail Data Scientist: [GitHub](https://github.com/Ahmed-Sohail2000) / [LinkedIn](https://www.linkedin.com/in/ahmed-sohail/) / [Email](ahmedsohail02000@gmail.com)
- Zaid Hassan Software Engineer: [GitHub](https://github.com/ZaidHassan96) / [LinkedIn](https://www.linkedin.com/in/zaid-h-b12b421ab/) / [Email](zaidhas96@outlook.com)
- Conor Barry Software Engineer: [GitHub](https://github.com/CaptOrb) / [LinkedIn](https://www.linkedin.com/in/conor-barry1/) / [Email](tehorb13@gmail.com)
- Ngodi Albert: [GitHub](https://github.com/ngodi) / [LinkedIn](https://linkedin.com/in/albertngodi) / [Email](albertngodi@gmail.com)
- Maryam Hazrati: [GitHub](https://github.com/Maryamh12) / [LinkedIn](https://www.linkedin.com/in/maryam-hazratiii/)
