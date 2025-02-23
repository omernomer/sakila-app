import { PrismaClient } from "@prisma/client";
import cors from "cors";
import express, { Application } from "express";

const app: Application = express();
const prisma = new PrismaClient();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.get("/", (req, res) => {
  res.send("Welcome to the backend!");
});

app.get("/users", async (req, res) => {
  const users = await prisma.customer.findMany({
    orderBy: {
      last_update: "desc",
    },
  });
  const activeUsers = users.filter((user: any) => user.active);
  const inactiveUsers = users.filter((user: any) => !user.active);
  res.json({ activeUsers, inactiveUsers });
});

app.post("/update-user-status", async (req, res) => {
  const { id, active } = req.body;
  try {
    const user = await prisma.customer.update({
      where: { customer_id: id },
      data: { active },
    });

    res.json(user);
  } catch (error) {
    console.log(error);
  }
});

app.get("/categoriesCount", async (_req, res) => {
  try {
    const fileCategories = await prisma.film_category.findMany({});
    const categories = await prisma.category.findMany({});
    const categoriesCount = categories.map((category: any) => {
      return {
        name: category.name,
        count: fileCategories.filter(
          (fileCategory: any) =>
            fileCategory.category_id === category.category_id
        ).length,
      };
    });

    res.json({ categoriesCount });
  } catch (error) {
    console.log(error);
  }
});

app.get("/mostRentedFilms", async (_req, res) => {
  try {
    const topRentedMovies: {
      title: string;
      rental_count: bigint;
    }[] = await prisma.$queryRaw`
      SELECT f.title, COUNT(r.rental_id) AS rental_count
        FROM rental r
        JOIN inventory i ON r.inventory_id = i.inventory_id
        JOIN film f ON i.film_id = f.film_id
        GROUP BY f.title
        ORDER BY rental_count DESC
        LIMIT 10;
    `;
    const topRentedFilms = topRentedMovies?.map((item) => ({
      title: item.title,
      rentalCount: Number(item.rental_count), // Convert BigInt to Number
    }));

    res.json({ topRentedFilms });
  } catch (error) {
    console.log(error);
  }
});

export default app;
