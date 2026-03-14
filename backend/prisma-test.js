const { PrismaClient } = require("@prisma/client");

async function main() {
  console.log("Starting Prisma test...");
  const prisma = new PrismaClient({
    datasource: {
      url: "file:./dev.db"
    }
  });
  
  try {
    console.log("Connecting...");
    await prisma.$connect();
    console.log("Connected successfully!");
    
    const count = await prisma.contact.count();
    console.log("Contact count:", count);
  } catch (e) {
    console.error("Prisma error caught:");
    console.error(e);
  } finally {
    await prisma.$disconnect();
  }
}

main();
