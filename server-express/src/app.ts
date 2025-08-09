import bodyParser from "body-parser";
import cors from "cors";
import express, { Request, Response } from "express";
import "./config/db";

import adminRoutes from "./routes/admin.routes";
import authRoutes from "./routes/auth.routes";
import caseRoutes from "./routes/case.routes";
import dashboardRoutes from "./routes/dashboard.routes";
import documentRoutes from "./routes/document.routes";
import generateRoutes from "./routes/generate.routes";
import userRoutes from "./routes/user.routes";

import path from "path";

const app = express();

// Enable CORS for all origins
app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

// Middleware
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, "../../frontend/dist")));

// Routes
app.use("/api/users", userRoutes);
app.use("/api/auth", authRoutes);
app.use("/uploads", express.static("uploads"));
app.use("/api/documents", documentRoutes);
app.use("/api/cases", caseRoutes);
app.use("/api/dashboard", dashboardRoutes);
app.use("/api/role-admin", adminRoutes);
app.use("/api/generate", generateRoutes);

app.get(/.*/, (_req, res) => {
  res.sendFile(path.join(__dirname, "../../frontend/dist/index.html"));
});

export default app;
