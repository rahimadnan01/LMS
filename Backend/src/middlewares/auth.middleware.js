import { ApiError } from "../utils/ApiError.js";
import { wrapAsync } from "../utils/wrapAsync.js";
import jwt from "jsonwebtoken";
import { User } from "../models/user.model.js";
export const verifyJwt = (role) => wrapAsync(async (req, res, next) => {
  try {
    const token =
      req.cookies?.accessToken ||
      req.header("Authorization").replace("Bearer", "");

    if (!token) {
      throw new ApiError(400, "Unauthorized User token not found");
    }

    let decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);

    if (!decodedToken) {
      throw new ApiError(400, "User is unauthorized ");
    }

    let user = await User.findById(decodedToken._id).select("-password");
    if (role && user.role !== role) {
      throw new ApiError(403, "Access Denied")
    }
    if (!user) {
      throw new ApiError(500, "Something went wrong while decoding the token");
    }

    req.user = user;

    next();
  } catch (error) {
    throw new ApiError(500, error.message);
  }
});
