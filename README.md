# AskIQ

# Project Overview

AskIQ is an interactive AI GPT utilizing google gemini API to handle user queries and responses based on the user input form designed in a pentagram fashion to tailor custom queries for the model to respond, edit, and submit new queries.

## Project Features/Functionalities

AskIQ contains fundamentals features and functionalities that makes it unique and distinctive to the other AI models which are:

1. A JWT based user authentication system, where user passwords are hashed and stored securely on the database.
2. A gif animation overview of the working app for both desktop and mobile users.
3. A submit button of the pentagram form to interact with the AI model.
4. An edit the same user response or create a new response option which allows flexibility and accessibility for the ease of the user.
5. Validation and error handling for users submitting empty fields in the pentagram form.
6. A result area of the model response to view and read from it.

## Project Dependencies

AskIQ has external resources that was used to deploy and operate which are:

1. NodeJS
2. PostgresSQL

## How to use the AskIQ App 

Here are the below steps needed to run the app in your system:

Step 1 : Get a Gemini API key from https://ai.google.dev/gemini-api/docs/api-key

Step 2: create an .env file in the backend directory with the following contents:

  * `DB_HOST`=localhost 

  * `DB_USER`=postgres

  * `DB_PASSWORD`={YOUR-POSTGRES-PASSWORD]

  * `DB_NAME`=database

  * `DB_PORT`=5432

  * `SECRET_KEY`={YOUR-SECRET-JWT-KEY}

  * `GEMINI_API_KEY`={YOUR-SECRET-GEMINI-KEY}

  * `GEMINI_MODEL`=gemini-1.5-flash

  * `DATABASE_URL`={YOUR-PROD-POSTRESQL-DB}

  * `NODE_ENV`=development

  * `CORS_ORIGINS_PROD`={YOUR_PROD_CORS_ORIGINS}

  * `CORS_ORIGINS_DEV`=http://localhost:3000,http://localhost:5173

Step 3: cd backend

Step 4: Add psql to Path if on Windows

Step 5: Run the following command to create the database and tables:

`psql -U postgres -f src/setup.sql`

Step 6: Start the Backend and type npm run dev

Step 7: cd client

Step 8: npm install

Step 9: Run the Frontend: npm run dev

Step 10: Frontend will be available on http://localhost:5173/

## Our Team 

- Doris John Primary Scrum Master #1: [GitHub](https://github.com/Djohn25) / [LinkedIn](https://www.linkedin.com/in/dorisukpejohn/) / [Email](Jsecus23@gmail.com)
- VICTORIA IDRIS SHADOW SCRUM MASTER #2: [GitHub](https://github.com/VICTORIAIDRIS) / [LinkedIn](https://linkedin.com/in/VICTORIA-IDRIS-7847A1177) / [Email](UNEKWUIDRIS@GMAIL.COM)
- Ahmed Sohail Data Scientist: [GitHub](https://github.com/Ahmed-Sohail2000) / [LinkedIn](https://www.linkedin.com/in/ahmed-sohail/) / [Email](ahmedsohail02000@gmail.com)
- Zaid Hassan Software Engineer: [GitHub](https://github.com/ZaidHassan96) / [LinkedIn](https://www.linkedin.com/in/zaid-h-b12b421ab/) / [Email](zaidhas96@outlook.com)
- Conor Barry Software Engineer: [GitHub](https://github.com/CaptOrb) / [LinkedIn](https://www.linkedin.com/in/conor-barry1/) / [Email](tehorb13@gmail.com)
- Ngodi Albert: [GitHub](https://github.com/ngodi) / [LinkedIn](https://linkedin.com/in/albertngodi) / [Email](albertngodi@gmail.com)
- Maryam Hazrati: [GitHub](https://github.com/Maryamh12) / [LinkedIn](https://www.linkedin.com/in/maryam-hazratiii/)
