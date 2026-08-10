import dotenv from "dotenv";
import app from "./src/app.js";
import connectToMongoDb from "./src/dbConfig/connectToDb.js";
dotenv.config({ path: ".env", quiet: true });

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  connectToMongoDb();
});
