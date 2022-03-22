import nc from "next-connect";
import { connectDB } from '../../../middleware';
import { getShopById, updateShop, deleteShop } from '../../../controllers/shop';

const handler = nc({ attachParams: true });
handler.get(getShopById);
handler.put(updateShop);
handler.delete(deleteShop);

export default connectDB(handler);