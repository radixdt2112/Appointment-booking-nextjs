// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { connectDB } from '../../middleware';
import nc from "next-connect";
import { login } from '../../controllers/login';

const handler = nc();

handler.post(login);

export default connectDB(handler);