import express from "express"
import cors from "cors"
import resourceRoutes from "./routes/resources.js"
import userRoutes from "./routes/users.js"
import relationshipRoutes from "./routes/relationships.js"
import errorHandler from "./middleware/errorHandler.js"
import path from "path"
import { fileURLToPath } from "url"

// Get the directory name
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const app = express()
const PORT = process.env.PORT || 3000

// Middleware
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// Serve static files
app.use(express.static(path.join(__dirname, "public")))

// Routes
app.use("/api/resources", resourceRoutes)
app.use("/api/users", userRoutes)
app.use("/api/relationships", relationshipRoutes)

// Home route
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"))
})

// Error handling middleware
app.use(errorHandler)

// 404 handler
app.use((req, res) => {
  res.status(404).json({ message: "Route not found" })
})

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`)
  console.log(`Access the API at http://localhost:${PORT}`)
})

