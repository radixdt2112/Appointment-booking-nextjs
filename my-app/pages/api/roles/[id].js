import nc from "next-connect";
import { connectDB, adminRoute } from '../../../middleware';
import { getRoleById, updateRole, deleteRole } from '../../../controllers/roles';

const handler = nc({ attachParams: true }).use(adminRoute);
handler.get(getRoleById);
handler.put(updateRole);
handler.delete(deleteRole);

export default connectDB(handler);