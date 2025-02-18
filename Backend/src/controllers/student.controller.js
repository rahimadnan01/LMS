import { User } from "../models/user.model.js";
import { Student } from "../models/Student.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { wrapAsync } from "../utils/wrapAsync.js";
import { generateAccessAndRefreshToken } from "../utils/tokens.js"
// generate access and refresh token


// register student
const registerStudent = wrapAsync(async (req, res) => {
  let { username, email, password } = req.body;
  if ([username, email, password].some((field) => field?.trim()) === "") {
    throw new ApiError(400, "Provide all fields");
  }

  let existedUser = await User.findOne({
    email: email,

  });
  if (existedUser) {
    throw new ApiError(401, "User already exists");
  }

  let user = await User.create({
    username: username,
    email: email,
    password: password,
    role: "student",
  });

  let createdUser = await User.findById(user._id).select(
    "-password -refreshToken",
  );

  const student = await Student.create({
    user: user._id
  })

  let createdStudent = await Student.findById(student._id).populate(
    {
      path: "user",
      select: "username email role"
    }
  )
  if (!createdUser) {
    throw new ApiError(500, "Something went wrong while registering a User");
  }

  if (!createdStudent) {
    throw new ApiError(500, "Something went wrong while registering the user")
  }
  res
    .status(200)
    .json(new ApiResponse(200, "User registered successfully", createdStudent));
});

// login student

const loginStudent = wrapAsync(async (req, res) => {
  let { email, password } = req.body;

  if (email == "" || password == "") {
    throw new ApiError(400, "Both email and password are required");
  }

  let user = await User.findOne({ email });
  if (!user) {
    throw new ApiError(400, "User not found email not found");
  }

  if (user.role !== "student") {
    throw new ApiError(403, "Access Denied only student can login on this page")
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
        "User loggedIn successfully",
        {
          loggedInUser,
          accessToken,
          refreshToken,
        }

      ),
    );
});

// logout student
const logoutStudent = wrapAsync(async (req, res) => {
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



export { registerStudent, loginStudent, logoutStudent };
