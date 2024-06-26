import { db, init } from "@/lib/db";

export async function GET() {
  await init();
  const lol = await db.services.users.insertOne({
    name: "test",
    email: "fasdf@gm.com"
  })

  return new Response("good")
}