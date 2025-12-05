import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// // create a new user
// await prisma.users.create({
//   data: {
//     name: "John Dough",
//     email: `john-${Math.random()}@example.com`,
//   },
// });


// export async function getCount() {
//     // count the number of users
//     const count = await prisma.users.count();
//     console.log(`There are ${count} users in the database.`);

//     return count;
// }



export default prisma;

