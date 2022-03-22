import { connectDB, adminRoute } from '../../../middleware';
import { getShops, addShop } from '../../../controllers/shop';
import nc from "next-connect";

const handler = nc({ attachParams: true });

handler.get(getShops);
handler.post(addShop);


export default connectDB(handler);