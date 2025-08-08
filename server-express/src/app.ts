import bodyParser from "body-parser";
import cors from "cors";
import express from "express";
import "./config/db";
import authRoutes from "./routes/auth.routes";
import caseRoutes from "./routes/case.routes";
import documentRoutes from "./routes/document.routes";
import userRoutes from "./routes/user.routes";
import adminRoutes from "./routes/admin.routes";
import generateRoutes from "./routes/generate.routes";

const app = express();

// Enable CORS for all origins
app.use(cors()); // ← This allows all origins

// If you need to customize further:
app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

// Middleware
app.use(bodyParser.json());

// Routes
app.use("/api/users", userRoutes);
app.use("/api/auth", authRoutes);
app.use("/uploads", express.static("uploads"));
app.use("/api/documents", documentRoutes);
app.use("/api/cases", caseRoutes);

app.use("/api/role-admin", adminRoutes);

app.use("/api/generate", generateRoutes);

// Health check route
app.get("/", (_req, res) => {
  res.send("✅ Express + MySQL + TS server is live!");
});

export default app;
