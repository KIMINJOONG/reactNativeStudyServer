import jwt from "jsonwebtoken";
import db from '../models';

const decodeJWT = async token => {
  try {
    const decoded = jwt.verify(token, process.env.JWT_TOKEN || "");
    const { id } = decoded;
    const user = await db.User.findOne({
      where: { id }
    });
    return user;
  } catch (error) {
    console.log('error');
    return undefined;
  }
};
export default decodeJWT;
