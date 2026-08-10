import AsyncWrapper from "../utils/AsyncWrapper.js";
import ExpressError from "../utils/ExpressError.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/User.js";
import { OAuth2Client } from "google-auth-library";
import {
  sendUserCredentialEmail,
  sendUserPasswordResetEmail,
} from "../utils/Nodemailer.js";
import path from "path";
import fs from "fs/promises";
import { parseCSV, parseExcel } from "../utils/fileParser.js";

const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

const generateToken = (user) => {
  return jwt.sign(
    {
      id: user._id,
      email: user.email,
      role: user.role,
      name: user.name,
    },
    process.env.JWT_SECRET,
    { expiresIn: "12h" }
  );
};

const handleEmailLogin = async (email, password) => {
  const user = await User.findOne({ email }).select("+password");

  if (!user || !(await bcrypt.compare(password, user.password))) {
    return { error: "Invalid email or password", status: 401 };
  }

  if (!user.is_active) {
    return { error: "Your account is deactivated", status: 403 };
  }

  const token = generateToken(user);
  return {
    message: "Login successful",
    token,
    success: true,
  };
};

const handleGoogleLogin = async (authToken) => {
  const ticket = await client.verifyIdToken({
    idToken: authToken,
    audience: process.env.GOOGLE_CLIENT_ID,
  });

  const payload = ticket.getPayload();
  const googleId = payload.sub;
  const email = payload.email;

  const user = await User.findOne({
    $or: [{ google_id: googleId }, { email }],
  });

  if (!user) {
    return { error: "User not found", status: 401 };
  }

  if (!user.is_active) {
    return { error: "Your account is deactivated", status: 403 };
  }

  const jwtToken = generateToken(user);

  return {
    message: "Login successful",
    token: jwtToken,
    user: {
      id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      is_active: user.is_active,
    },
    success: true,
  };
};

export const signIn = AsyncWrapper(async (req, res) => {
  const { email, password, authToken } = req.body;

  let result;

  if (authToken) {
    result = await handleGoogleLogin(authToken);
  } else if (email && password) {
    result = await handleEmailLogin(email, password);
  } else {
    throw new ExpressError(400, "Missing credentials", false);
  }

  if (result.error) {
    return res.status(result.status).json({ message: result.error });
  }

  return res.status(200).json(result);
});

export const signUp = AsyncWrapper(async (req, res) => {
  const { name, email, password, role } = req.body;

  if (!name || !email || !password) {
    throw new ExpressError(400, "All fields are required", false);
  }

  const existingUser = await User.findOne({ email });
  if (existingUser) {
    throw new ExpressError(400, "Email already in use", false);
  }

  const hashedPassword = await bcrypt.hash(password, 12);

  const createdById = req.user?.id || null;

  const user = await User.create({
    name,
    email,
    password: hashedPassword,
    role: role || "designer",
    createdBy: createdById,
    updatedBy: createdById,
  });

  await sendUserCredentialEmail(user, password);

  res.status(201).json({
    message: "User registered successfully",
    success: true,
    user: {
      id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      is_active: user.is_active,
      createdBy: user.createdBy,
      createdAt: user.createdAt,
    },
  });
});

export const getAllUsers = AsyncWrapper(async (_req, res) => {
  const users = await User.find()
    .select("-password")
    .populate("createdBy", "email")
    .populate("updatedBy", "email")
    .sort({ createdAt: -1 })
    .setOptions({ strictPopulate: false });

  res.status(200).json({
    message: "Users retrieved successfully",
    success: true,
    users,
    count: users.length,
  });
});

export const updateUser = AsyncWrapper(async (req, res) => {
  const { id } = req.params;
  const { name, email, password, role, is_active, is_verified } = req.body;

  const user = await User.findById(id);
  if (!user) {
    throw new ExpressError(404, "User not found", false);
  }

  if (name !== undefined) user.name = name;
  if (email !== undefined) user.email = email;
  if (role !== undefined) user.role = role;
  if (typeof is_active === "boolean") user.is_active = is_active;
  if (typeof is_verified === "boolean") user.is_verified = is_verified;

  if (password) {
    user.password = await bcrypt.hash(password, 12);
  }

  user.updatedBy = req.user?.id || null;

  await user.save();

  res.status(200).json({
    message: "User updated successfully",
    success: true,
    user: {
      id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      is_active: user.is_active,
      is_verified: user.is_verified,
      updatedBy: user.updatedBy,
      updatedAt: user.updatedAt,
    },
  });
});

export const createMultipleUsers = AsyncWrapper(async (req, res) => {
  const { users } = req.body;
  console.log(users);

  if (!Array.isArray(users) || users.length === 0) {
    throw new ExpressError(400, "Users array is required", false);
  }

  const createdById = req.user?.id || null;
  const createdUsers = [];

  for (const userData of users) {
    const { name, email, password, role } = userData;

    if (!name || !email || !password) {
      throw new ExpressError(
        400,
        "Each user must have name, email, and password",
        false
      );
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      console.warn(`Email already exists: ${email}, skipping...`);
      continue;
    }

    const hashedPassword = await bcrypt.hash(password, 12);
    const newUser = await User.create({
      name,
      email,
      password: hashedPassword,
      role: role || "designer",
      createdBy: createdById,
      updatedBy: createdById,
    });

    createdUsers.push(newUser);

    // await sendUserCredentialEmail(newUser, password);
  }

  res.status(201).json({
    message: "Users created successfully",
    success: true,
    count: createdUsers.length,
    users: createdUsers.map((u) => ({
      id: u._id,
      name: u.name,
      email: u.email,
      role: u.role,
      is_active: u.is_active,
      createdBy: u.createdBy,
      createdAt: u.createdAt,
    })),
  });
});

export const adminResetUserPassword = AsyncWrapper(async (req, res) => {
  const { id } = req.params;
  const { newPassword } = req.body;

  if (!newPassword || newPassword.length < 6) {
    throw new ExpressError(
      400,
      "Password must be at least 6 characters long",
      false
    );
  }

  if (req.user?.role !== "admin") {
    throw new ExpressError(
      403,
      "You are not authorized to perform this action",
      false
    );
  }

  const user = await User.findById(id);
  if (!user) {
    throw new ExpressError(404, "User not found", false);
  }

  const hashedPassword = await bcrypt.hash(newPassword, 12);
  user.password = hashedPassword;
  user.updatedBy = req.user?.id || null;

  await user.save();

  try {
    await sendUserPasswordResetEmail(user, newPassword);
  } catch (err) {
    console.error("Failed to send password reset email:", err.message);
  }

  res.status(200).json({
    message: `Password for ${user.email} has been reset successfully`,
    success: true,
    user: {
      id: user._id,
      name: user.name,
      email: user.email,
      updatedBy: user.updatedBy,
      updatedAt: user.updatedAt,
    },
  });
});

export const uploadAndCreateUsers = AsyncWrapper(async (req, res) => {
  if (!req.file) {
    throw new ExpressError(400, "No file uploaded", false);
  }

  const filePath = req.file.path;
  const ext = path.extname(filePath).toLowerCase();
  let users;

  if (ext === ".csv") {
    users = await parseCSV(filePath);
  } else if (ext === ".xlsx" || ext === ".xls") {
    users = await parseExcel(filePath);
  } else {
    await fs.unlink(filePath);
    throw new ExpressError(400, "Unsupported file type", false);
  }

  if (!users.length) {
    await fs.unlink(filePath);
    throw new ExpressError(400, "No user data found in file", false);
  }

  const createdById = req.user?.id || null;
  const createdUsers = [];

  for (const userData of users) {
    const { name, email, password, role } = userData;

    if (!name || !email || !password) {
      throw new ExpressError(
        400,
        "Each user must have name, email, and password",
        false
      );
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      console.warn(`Email already exists: ${email}, skipping...`);
      continue;
    }

    const hashedPassword = await bcrypt.hash(password, 12);
    const newUser = await User.create({
      name,
      email,
      password: hashedPassword,
      role: role || "designer",
      createdBy: createdById,
      updatedBy: createdById,
    });

    createdUsers.push(newUser);

    await sendUserCredentialEmail(newUser, password);
  }

  await fs.unlink(filePath);
  res.status(201).json({
    message: "Users created successfully",
    success: true,
    count: createdUsers.length,
    users: createdUsers.map((u) => ({
      id: u._id,
      name: u.name,
      email: u.email,
      role: u.role,
      is_active: u.is_active,
      createdBy: u.createdBy,
      createdAt: u.createdAt,
    })),
  });
});
