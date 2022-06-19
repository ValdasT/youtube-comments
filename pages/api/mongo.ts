import { Filter } from 'mongodb';
import { NextApiRequest, NextApiResponse } from 'next';
import { connectToDatabase } from '../../utils/database';

type Data = {
  name: string;
};

const findAll = async (collection: string, query: Filter<any>): Promise<any> => {
  try {
    const { db } = await connectToDatabase();
    const response = await db.collection(collection).find(query).toArray();
    return Promise.resolve(response.length > 0 ? response : []);
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

const updateMany = async (collection: string, docs: Document[]): Promise<any> => {
  try {
    const { db } = await connectToDatabase();
    const ops = docs.map((item: any) => ({
      updateOne: {
        filter: { videoId: item.videoId },
        update: { $set: { ...item, timestamp: new Date().getTime() } },
        upsert: true,
      },
    }));
    const response = await await db.collection(collection).bulkWrite(ops);
    return Promise.resolve(response);
  } catch (error) {
    console.log(error);
    return error;
  }
};

export default async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  const { method, name, collection, doc, query } = JSON.parse(req.body);
  switch (name) {
    case 'findAll': {
      const data = await findAll(collection, query);
      res.status(200).json(data);
      break;
    }
    case 'updateMany':
      res.status(201).json(await updateMany(collection, doc));
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
