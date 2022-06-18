import { MongoClient, MongoClientOptions, Db } from 'mongodb';

let cachedClient: MongoClient;
let cachedDb: Db;

export const connectToDatabase = async () => {
  if (cachedClient && cachedDb) {
    return { client: cachedClient, db: cachedDb };
  }

  const client = await MongoClient.connect(
    process.env.MONGODB_URI as string,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    } as MongoClientOptions
  );

  const db: Db = client.db(process.env.MONGODB_DB as string);

  cachedClient = client;
  cachedDb = db;

  return { client: cachedClient, db: cachedDb };
};

export default connectToDatabase;
