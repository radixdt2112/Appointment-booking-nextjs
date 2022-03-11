// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import connectDB from '../../middleware/dbConnect';
import nc from "next-connect";

const handler = nc();

handler.get("/api/hello", (req, res, next) => {
  res.send('Hello world');
});

export default connectDB(handler);