import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import todoRouter from "./routes/todoRouter"


dotenv.config(); // Load environment variables

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors()); // Enable CORS
app.use(express.json()); // Parse JSON requests

app.use("/api/todos", todoRouter);

// Start server
app.listen(PORT, () => {
  console.log(`✅ Server is running on http://localhost:${PORT}`);
});
