import { Filter } from 'mongodb';
import { NextApiRequest, NextApiResponse } from 'next';
import { connectToDatabase } from '../../utils/database';

type Data = {
  name: string;
};

const findOne = async (collection: string, query: Filter<any>): Promise<any> => {
  try {
    const { db } = await connectToDatabase();
    const response = await db.collection(collection).findOne(query);
    if (response === null || response === undefined) {
      return Promise.resolve({});
    }
    return Promise.resolve(response);
  } catch (error) {
    console.log(error);
    return error;
  }
};

const insertOne = async (collection: string, doc: Document): Promise<any> => {
  try {
    const { db } = await connectToDatabase();
    const response = await db.collection(collection).insertOne(doc);
    return Promise.resolve(response);
  } catch (error) {
    console.log(error);
    return error;
  }
};

const updateOne = async (collection: string, query: Filter<any>, doc: Document): Promise<any> => {
  try {
    const { db } = await connectToDatabase();
    const response = await db.collection(collection).updateOne(query, doc, { upsert: true });
    return Promise.resolve(response);
  } catch (error) {
    console.log(error);
    return error;
  }
};

export default async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  const { method, name, collection, doc, query } = JSON.parse(req.body);
  switch (name) {
    case 'findOne': {
      const data = await findOne(collection, query);
      res.status(200).json(data);
      break;
    }
    case 'updateOne':
      res.status(201).json(await updateOne(collection, query, doc));
      break;
    case 'insertOne': {
      const data = await insertOne(collection, doc);
      res.status(200).json(data);
      break;
    }
    default:
      res.setHeader('Allow', ['findOne', 'insertOne']);
      res.status(405).end(`Method ${method} not allowed`);
  }
};
