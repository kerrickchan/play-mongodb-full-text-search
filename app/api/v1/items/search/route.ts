import { MongoClient } from 'mongodb';
import { NextRequest, NextResponse } from 'next/server';

const uri = process.env.MONGODB_URI ?? 'mongodb://localhost:27017/play-mongodb-full-text-search';
const client = new MongoClient(uri);
await client.connect();
const db = client.db('play-mongodb-full-text-search');
const collection = db.collection('items');

export async function GET(req: NextRequest) {
  const searchQuery = new URL(req.url).searchParams;
  const query = searchQuery.get('query');
  const items = await collection.find({
    text: { $regex: query, $options: 'i' }
  }).toArray();
  return NextResponse.json(items);
}
