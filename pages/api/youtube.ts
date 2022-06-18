import axios from 'axios';

export default axios.create({
  baseURL: process.env.NEXT_PUBLIC_YOUTUBE_BASE_URL,
  params: { key: process.env.NEXT_PUBLIC_YOUTUBE_TOKEN },
});

// type Data = {
//   name: string;
// };
// export default async (req: NextApiRequest, res: NextApiResponse<Data>) => {
//   console.log(req.query);
//   const response = await axios.get(process.env.YOUTUBE_BASE_URL as string, { params: { key: process.env.YOUTUBE_TOKEN } });
//   res.status(200).json(response.data);
// };
