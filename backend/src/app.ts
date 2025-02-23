import { PrismaClient } from '@prisma/client';
import cors from "cors";
import express, { Application } from "express";

const app: Application = express();
const prisma = new PrismaClient()


// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.get("/", (req, res) => {
  res.send("Welcome to the backend!");
});

app.get("/users", async (req, res) => {
  const users = await prisma.customer.findMany();
  const activeUsers = users.filter((user: any) => user.active);
  const inactiveUsers = users.filter((user: any) => !user.active);
  res.json({ activeUsers, inactiveUsers });
});

app.post("/update-user-status", async (req, res) => {
  const { id, active } = req.body;
  const user = await prisma.customer.update({
    where: { customer_id: id },
    data: { active }, 
  });

  res.json(user);
});

export default app;