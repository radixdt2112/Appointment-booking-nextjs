import nc from "next-connect";
import { connectDB, adminRoute } from '../../../middleware';
import { getUserById, updateUser, deleteUser } from '../../../controllers/users';

const handler = nc({ attachParams: true }).use(adminRoute);

handler.get(getUserById);
handler.put(updateUser);
handler.delete(deleteUser);

export default connectDB(handler);