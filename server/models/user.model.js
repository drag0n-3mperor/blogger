import mongoose from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      index: true
    },
    fullname: {
      type: String,
      required: true
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      index: true
    },
    password: {
      type: String,
      required: true,
      trim: true
    },
    dob: {
      type: Date,
      required: true
    },
    avatar: {
      type: String,
      required: true
    },
    refreshToken: {
      type: String
    }
  },
  {
    timestamps: true
  }
);

userSchema.methods.isValidPassword = function(password) {
  return bcrypt.compare(password, this.password);
};

userSchema.pre("save", async function(next) {
  if (!this.isModified("password")) {
    this.password = await bcrypt.hash(this.password, process.env.BCRYPT_SALT_ROUND);
  }
  next();
});

userSchema.methods.generateAccessToken = function() {
  return jwt.sign(
    {
      _id: this._id,
      email: this.email,
      username: this.username
    },
    process.env.JWT_ACCESS_TOKEN_SECRET,
    {
      expiresIn: process.env.JWT_ACCESS_TOKEN_EXPIRY
    }
  );
};

userSchema.methods.generateRefreshToken = function() {
  return jwt.sign(
    {
      _id: this._id
    },
    process.env.JWT_REFRESH_TOKEN_SECRET,
    {
      expiresIn: process.env.JWT_REFRESH_TOKEN_EXPIRY
    }
  );
};

export const User = mongoose.model("User", userSchema);