import mongoose from "mongoose";
import dotenv from "dotenv";
import { readFileSync } from "fs";
import { fileURLToPath } from "url";
import { dirname, join } from "path";

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const DB_DIR = join(__dirname, "../(kambaz)/database");

const CONNECTION_STRING =
  process.env.DATABASE_CONNECTION_STRING || "mongodb://127.0.0.1:27017/kambaz";

const users = JSON.parse(readFileSync(join(DB_DIR, "users.json"), "utf-8"));
const courses = JSON.parse(readFileSync(join(DB_DIR, "courses.json"), "utf-8"));
const modules = JSON.parse(readFileSync(join(DB_DIR, "modules.json"), "utf-8"));
const enrollments = JSON.parse(readFileSync(join(DB_DIR, "enrollments.json"), "utf-8"));

// Embed modules into their courses
const coursesWithModules = courses.map((course) => ({
  ...course,
  modules: modules
    .filter((m) => m.course === course._id)
    .map(({ course: _course, ...rest }) => rest), // strip the `course` field
}));

await mongoose.connect(CONNECTION_STRING);
console.log("Connected to MongoDB:", CONNECTION_STRING);

const db = mongoose.connection.db;

// Drop and re-seed each collection
for (const [collName, docs] of [
  ["users", users],
  ["courses", coursesWithModules],
  ["enrollments", enrollments],
]) {
  await db.collection(collName).deleteMany({});
  if (docs.length > 0) {
    await db.collection(collName).insertMany(docs);
  }
  console.log(`Seeded ${docs.length} documents into '${collName}'`);
}

await mongoose.disconnect();
console.log("Done — database seeded successfully.");
