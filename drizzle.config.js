import { defineConfig } from "drizzle-kit";
 
export default defineConfig({
  schema: "./configs/schema.js",
  out: "./drizzle",
  dialect: 'postgresql',
  dbCredentials: {
    url: 'postgresql://aidb_owner:FJr0QxBgL5OM@ep-rapid-tree-a13qk0c6.ap-southeast-1.aws.neon.tech/aidb?sslmode=require',
  }
});
