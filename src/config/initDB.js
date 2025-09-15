import {sql} from "./db.js";

const initDatabase = async () => {
    try {
       await sql`
                CREATE TABLE IF NOT EXISTS transactions(
                    id SERIAL PRIMARY KEY,
                    user_id VARCHAR(200) NOT NULL,
                    title VARCHAR(200) NOT NULL,
                    amount DECIMAL(10, 2) NOT NULL,
                    category VARCHAR(200) NOT NULL,
                    description TEXT,
                    payment_mode VARCHAR(200) NOT NULL,
                    created_at DATE NOT NULL DEFAULT CURRENT_DATE
                    
                );
        `
        console.log("Database initialized successfully!");

    } catch (error) {
        console.log("Error initializing databse", error);
        process.exit(1);        
    }
}
export default initDatabase;