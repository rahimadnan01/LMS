import { User } from "../models/user.model.js";
import { Student } from "../models/Student.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { wrapAsync } from "../utils/wrapAsync.js";
import jwt from "jsonwebtoken";
// generate access and refresh token
const generateAccessAndRefreshToken = async (userId) => {
  try {
    let user = await User.findById(userId);
    if (!user) {
      throw new ApiError(400, "user not found");
    }
    let accessToken = user.generateAccessToken();
    let refreshToken = user.generateRefreshToken();
    user.refreshToken = refreshToken;
    await user.save({ validateBeforeSave: false });
    await User.findByIdAndUpdate(userId, {
      refreshToken: refreshToken,
    });
    return { accessToken, refreshToken };
  } catch (err) {
    if (err) {
      throw new ApiError(
        500,
        "Something went wrong while generating an access and refresh Tokens",
      );
    }
  }
};

// register User
const registerUser = wrapAsync(async (req, res) => {
  let { username, email, password, role } = req.body;
  if ([username, email, password, role].some((field) => field?.trim()) === "") {
    throw new ApiError(400, "Provide all fields");
  }

  let existedUser = await User.findOne({
    email: email,
    username: username,
  });
  if (existedUser) {
    throw new ApiError(401, "User already exists");
  }

  let user = await User.create({
    username: username,
    email: email,
    password: password,
    role: role,
  });

  let createdUser = await User.findById(user._id).select(
    "-password -refreshToken",
  );

  if (createdUser.role === "student") {
    try {
      let student = await Student.create({
        user: createdUser._id,
      });
      if (!student) {
        throw new ApiError(400, "failed to create new Student");
      }
    } catch (error) {
      throw new ApiError(
        500,
        "something went wrong while creating a new Student",
      );
    }
  }

  if (!createdUser) {
    throw new ApiError(500, "Something went wrong while registering a User");
  }

  res
    .status(200)
    .json(new ApiResponse(200, createdUser, "User registered successfully"));
});

// login user

const LoginUser = wrapAsync(async (req, res) => {
  let { email, password } = req.body;

  if (email == "" || password == "") {
    throw new ApiError(400, "Both email and password are required");
  }

  let user = await User.findOne({ email });
  if (!user) {
    throw new ApiError(400, "User not found email not found");
  }
  let validatePassword = await user.isPasswordCorrect(password);
  if (!validatePassword) {
    throw new ApiError(400, "Invalid Credentials");
  }

  let tokens = await generateAccessAndRefreshToken(user._id);

  if (!tokens || !tokens.accessToken || !tokens.refreshToken) {
    throw new ApiError(500, "Failed to generate tokens");
  }
  let { accessToken, refreshToken } = tokens;

  let loggedInUser = await User.findById(user._id).select(
    "-password -refreshToken",
  );
  if (!loggedInUser) {
    throw new ApiError(500, "Failed to login");
  }

  let options = {
    httpOnly: true,
    secure: true,
  };

  res
    .status(200)
    .cookie("refreshToken", refreshToken, options)
    .cookie("accessToken", accessToken, options)
    .json(
      new ApiResponse(
        200,
        loggedInUser,
        accessToken,
        refreshToken,
        "User loggedIn successfully",
      ),
    );
});

// logoutUser
const logoutUser = wrapAsync(async (req, res) => {
  await User.findByIdAndUpdate(
    req.user?._id,
    {
      $unset: {
        refreshToken: 1,
      },
    },
    {
      new: true,
    },
  );

  let options = {
    httpOnly: true,
    secure: true,
  };

  res
    .status(200)
    .clearCookie("refreshToken", options)
    .clearCookie("accessToken", options)
    .json(new ApiResponse(200, {}, "User log out successfully"));
});

const refreshAccessToken = wrapAsync(async (req, res) => {
  const incomingRefreshToken =
    req.cookies?.refreshToken || req.body.refreshToken;
  console.log("incoming :", incomingRefreshToken);
  if (!incomingRefreshToken) {
    throw new ApiError(500, "failed to fetch incoming token");
  }

  let verifyRefreshToken;

  try {
    verifyRefreshToken = jwt.verify(
      incomingRefreshToken,
      process.env.REFRESH_TOKEN_SECRET,
    );

    console.log("verifiedToken", verifyRefreshToken);
  } catch (error) {
    throw new ApiError(500, error.message);
  }

  if (!verifyRefreshToken) {
    throw new ApiError(400, "User is unauthorized");
  }

  const user = await User.findById(verifyRefreshToken._id);
  console.log("user:", user.refreshToken);
  if (incomingRefreshToken !== user.refreshToken) {
    throw new ApiError(400, "User is unauthorized");
  }

  let { accessToken, refreshToken: newRefreshToken } =
    await generateAccessAndRefreshToken(user._id);

  if (!accessToken || !newRefreshToken) {
    throw new ApiError(
      500,
      "Something went wrong while refreshing access token",
    );
  }

  let options = {
    httpOnly: true,
    secure: true,
  };

  res
    .status(200)
    .cookie("accessToken", accessToken, options)
    .cookie("refreshToken", newRefreshToken, options)
    .json(
      new ApiResponse(
        200,
        {
          accessToken,
          refreshToken: newRefreshToken,
        },
        "refresh Access token successfully",
      ),
    );
});

export { registerUser, LoginUser, logoutUser, refreshAccessToken };
