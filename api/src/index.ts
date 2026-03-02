import "dotenv/config";
// Use "type: module" in package.json to use ES modules
import express, { Request, Response } from "express";
const app = express();

// Define your routes
app.get("/", (_: Request, res: Response) => {
    res.json({ message: "Hello from Express on Vercel!" });
});

const PORT = process.env.PORT ?? 3000
if (process.env.NODE_ENV === "development") {
    app.listen(PORT, () => {
        console.log(`Example app listening on port ${PORT}`);
    });
}
// Export the Express app
export default app;
