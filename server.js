import { config } from "dotenv";
import ConnectDB from "./config/db.js";
import app from "./app.js";

config();

await ConnectDB();

app.listen(process.env.PORT, () => {
    console.log(`Server is running on port http://localhost:${process.env.PORT}`);
});