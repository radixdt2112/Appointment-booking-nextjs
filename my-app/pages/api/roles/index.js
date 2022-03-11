
// import connectDB from '../../../middleware/dbConnect';

import { connectDB, adminRoute } from '../../../middleware';
import { getRoles, addRole } from '../../../controllers/roles';
import nc from "next-connect";

const handler = nc({ attachParams: true }).use(adminRoute);

handler.get(getRoles);
handler.post(addRole);


export default connectDB(handler);