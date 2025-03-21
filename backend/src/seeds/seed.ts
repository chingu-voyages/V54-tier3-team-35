import format from "pg-format";
import { pool } from "../config/db";
import { promises } from "dns";
import bcrypt from "bcryptjs";

interface User {
    id: number,
    username: string,
    email: string,
    password: string
}


const users: User[] = [
    {
      id: 1,
      username: 'john_doe',
      email: 'john.doe@example.com',
      password: 'hashed_password_1',
    },
    {
      id: 2,
      username: 'jane_smith',
      email: 'jane.smith@example.com',
      password: 'hashed_password_2',
    },
    {
      id: 3,
      username: 'michael_lee',
      email: 'michael.lee@example.com',
      password: 'hashed_password_3',
    },
    {
      id: 4,
      username: 'susan_adair',
      email: 'susan.adair@example.com',
      password: 'hashed_password_4',
    },
    {
      id: 5,
      username: 'emma_davis',
      email: 'emma.davis@example.com',
      password: 'hashed_password_5',
    },
  ];



const seedUsers =  async () : Promise<void> => {
    try {

        const hashedUsers = await Promise.all(
          users.map(async (user) => ({
            ...user,
            password: await bcrypt.hash(user.password, 10), // Hash password
          }))
        );
  
        const query = format(
            'INSERT INTO users (id, username, email, password) VALUES %L ON CONFLICT (id) DO NOTHING',
            hashedUsers.map(user => [user.id, user.username, user.email, user.password])
          );
        await pool.connect()
        console.log("Connected to Database")
        await pool.query(query)
        console.log('Users successfully seeded!')
    }
    catch (error) {
        console.error("Error seeding users", error)
    }

  }



// Run the seeding function
seedUsers();
  




