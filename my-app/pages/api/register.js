// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { connectDB } from '../../middleware';
import nc from "next-connect";
import { register } from '../../controllers/login';

const handler = nc();

handler.post(register);

export default connectDB(handler);