import { MongoClient } from 'mongodb'
import { faker } from '@faker-js/faker';

// Make sure ran `npm run build` before running this script
import { Item } from '@/entity/item';

export const fake = async (number = 1000): Promise<Item[]> => {
  const items = [];
  for (let i = 0; i < number; i++) {
    const name = faker.company.name();
    items.push(new Item(name));
  }

  const uri = process.env.MONGODB_URI ?? 'mongodb://localhost:27017/play-mongodb-full-text-search';
  const client = new MongoClient(uri);

  try {
    await client.connect();
    const db = client.db('play-mongodb-full-text-search');
    const collection = db.collection('items');

    if (await collection.countDocuments() > 0) {
      return items;
    } else {
      await collection.createIndex({ text: 'text' });
      await collection.insertMany(items);
    }

  } finally {
    await client.close();
  }

  return items;
}
