
const dotenv = require("dotenv");
dotenv.config(); // load DATABASE_URL before PrismaClient is required

const { PrismaClient } = require("@prisma/client");
const { PrismaPg } = require("@prisma/adapter-pg");

// Create a Postgres adapter using the connection string from .env
const pgAdapter = new PrismaPg({ connectionString: process.env.DATABASE_URL });

// Pass the adapter to the PrismaClient constructor (Prisma v7+)
const prisma = new PrismaClient({ adapter: pgAdapter });

export { prisma };
