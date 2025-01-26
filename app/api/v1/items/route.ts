import { NextRequest, NextResponse } from 'next/server'
import { MongoClient } from 'mongodb'

import { Item } from '@/entity/item'
import { fake } from '@/seed/fake';

const uri = process.env.MONGODB_URI ?? 'mongodb://localhost:27017/play-mongodb-full-text-search';
const client = new MongoClient(uri);
await client.connect();
const db = client.db('play-mongodb-full-text-search');
const collection = db.collection('items');
await fake(1000);

export async function GET() {
  const items = await collection.find().toArray();
  return NextResponse.json(items);
}

export async function POST(req: NextRequest) {
  const body = await req.json();
  const item = new Item(body.text);

  const result = await collection.findOneAndUpdate(
    { id: item.id },
    { $set: item },
    { upsert: true, returnDocument: 'after' },
  );

  if (!result) {
    throw new Error('Failed to save item');
  }

  return NextResponse.json(result.value);
}


