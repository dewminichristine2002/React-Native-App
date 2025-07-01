import express from  "express";
import dotenv from "dotenv";
import { sql } from "./config/db.js";

dotenv.config();

const app = express();

app.get("/", (req, res)=> {
    res.send("It's working");
});


console.log("MY PORT : " , process.env.PORT);

const PORT = process.env.PORT || 5001;

async function initDB(){
    try {
        await sql `CREATE TABLE IF NOT EXISTS transactions(

        id SERIAL PRIMARY KEY,
        user_id varchar(255) NOT NULL,
        title VARCHAR(255) NOT NULL,
        amount DECIMAL(10,2) NOT NULL,
        category VARCHAR (255) NOT NULL,
        created_at DATE NOT NULL DEFAULT CURRENT_DATE
        )`;

        console.log("Database initialized successfully");

        
    } catch (error) {
        console.log("Eroor initializing DB", error);
        process.exit(1); // ststus code 1 mewans failure , 0 success
        
    }
    
}

/*app.listen(PORT, () => {
    console.log("Server is up and running on port: ", PORT);
} )*/

initDB().then(()=> {
    app.listen(PORT, () => {
    console.log("Server is up and running on port: ", PORT);
} );
})
