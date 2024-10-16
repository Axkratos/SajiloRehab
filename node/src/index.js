import dotenv from "dotenv";
dotenv.config({ path: './.env' });

import { app } from "./app.js";
import connectDB from './db/index.js';

connectDB().then(
    () => {
        app.on('error', (err) => {
            console.error("Internal Server Error", err);
            throw err;
        });
        app.listen(process.env.PORT || 8000, () => {
            console.log(`Server is Listening at port ${process.env.PORT || 8000}`);
        });
    }
).catch(
    (err) => {
        console.error("Mongodb Connection failed : ", err);
    }
);