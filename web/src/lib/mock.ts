import { FunctionItem } from "@/types/functions";



export const mockFunctions: FunctionItem[] = [
    {
        id: 1,
        name: 'db-write',
        content: `import cloud from '@lafjs/cloud'
export default async function (ctx: FunctionContext) {
  const db = cloud.mongo.db
  // Insert a new user record
  await db.collection('users').insertOne({
    username: 'laf_user',
    createdAt: new Date(),
    status: 'active'
  })
  
  console.log("User created successfully");
  return 'ok'
}`,
        isDirty: true,
        isOpen: true
    },
    {
        id: 2,
        name: 'shared',
        content: `export const utils = {
  formatDate: (date) => {
    return new Date(date).toISOString();
  },
  
  generateId: () => {
    return Math.random().toString(36).substr(2, 9);
  }
}`,
        isDirty: false,
        isOpen: false
    }

]
