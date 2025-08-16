import { model, Schema } from "mongoose";
import { IUser } from "../interfaces/user.interfaces";
import validator from "validator"

const userSchema = new Schema<IUser>(
  {
    firstName: {
      type: String,
      required: true,
      trim: true,
      minlength: 4,
      maxlength: 10,
    },
    lastName: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      lowercase: true,
      trim: true,
    //   validate: {
    //     validator: function (v) {
    //       return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i.test(v);
    //     },
    //     message: function (props) {
    //       return `${props.value} is not a valid email!`;
    //     },
    //   },
    validate:[validator.isEmail]
    },
    password: {
      type: String,
      required: true,
    },
    age: {
      type: Number,
      required: true,
      min: 18,
      max: 80,
    },
    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
    },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

export const User = model<IUser>("User", userSchema);
