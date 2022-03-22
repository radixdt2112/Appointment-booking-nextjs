import nc from "next-connect";
import { chkForValidToken, connectDB } from '../../../middleware';
import { getUserById, updateUser, deleteUser } from '../../../controllers/users';

const handler = nc({ attachParams: true });

handler.use(chkForValidToken).get(getUserById);
handler.put(updateUser);
handler.delete(deleteUser);

export default connectDB(handler);