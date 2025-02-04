import { ApiError } from "../utils/ApiError";
import { ApiResponse } from "../utils/ApiResponse.js";
import { wrapAsync } from "../utils/wrapAsync.js";
import { User } from "../models/user.model.js";
// create user
const createUser = wrapAsync(async () => {
  let { username, email, password, role } = req.body;
  if ([username, email, password, role].some((field) => field.trim()) === "") {
    throw new ApiError(400, "All fields are required");
  }

  let existedUser = await User.findOne({ email, username });
  if (existedUser) {
    throw new ApiError(400, "User already exists");
  }

  let user = await User.create({
    username: username,
    email: email,
    password: password,
    role: role,
  });

  if (!user) {
    throw new ApiError(500, "Something went wrong while creating a user");
  }

  let createdUser = await User.findById(user._id).select("-password");

  if (!createUser) {
    throw new ApiError(500, "Something went wrong while creating a User");
  }

  res
    .status(200)
    .json(new ApiResponse(200, createdUser, "User created successfully"));
});

// updateUser
const updateUser = wrapAsync(async () => {
  let { id } = req.params;
  let { username, email, password, role } = req.body;
  if (!id) {
    throw new ApiError(400, "Something went wrong while fetching an id");
  }

  let existedUser = await User.findById(id);

  if (!existedUser) {
    throw new ApiError(
      400,
      "Something went wrong while accessing to existedUser"
    );
  }

  if (email && typeof email !== "string") {
    throw new Api(400, "Email must be string");
  }
  if (username && typeof username !== "string") {
    throw new ApiError(400, "username must be string");
  }
  if (password && typeof username !== "string") {
    throw new ApiError(400, "username must be string");
  }
  if (role && typeof role !== "string") {
    throw new ApiError(400, "role should be string");
  }

  if (username && username !== existedUser.username) {
    let duplicateUsername = await User.findOne({ username });
    if (duplicateUsername) {
      throw new ApiError(400, "username already exists");
    }
  }
  if (email && email !== existedUser.email) {
    let duplicateEmail = await User.findOne({ email });
    if (duplicateEmail) {
      throw new ApiError(400, "email already exists");
    }
  }

  if (username) existedUser.username = username;
  if (email) existedUser.email = email;
  if (password) existedUser.password = password;
  if (role) existedUser.role = role;

  await existedUser.save({ validateBeforeSave: true });

  const updatedUser = await User.findById(existedUser._id).select("-password");

  if (!updatedUser) {
    throw new ApiError(500, "Something went wrong while updating a user");
  }

  res
    .status(200)
    .json(new ApiResponse(200, updatedUser, "User updated successfully"));
});
