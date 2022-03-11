
import { connectDB, adminRoute } from '../../../middleware';

import { getUsers } from '../../../controllers/users';

import nc from "next-connect";

const handler = nc().use(adminRoute);

handler.get(getUsers);
// handler.post(addUser);


export default connectDB(handler);