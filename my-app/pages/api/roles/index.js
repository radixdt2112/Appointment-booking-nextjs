
// import connectDB from '../../../middleware/dbConnect';

import { connectDB, adminRoute } from '../../../middleware';
import { getRoles, addRole } from '../../../controllers/roles';
import nc from "next-connect";

const handler = nc({ attachParams: true });

handler.get(getRoles);
handler.post(addRole).use(adminRoute);


export default connectDB(handler);