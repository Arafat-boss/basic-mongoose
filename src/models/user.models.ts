import { Model, model, Schema } from "mongoose";
import { IAddress, IUser, UserInstanceMethods } from "../interfaces/user.interfaces";
import validator from "validator";
import bcrypt from "bcrypt"


const addressSchema = new Schema<IAddress>({
  city: { type: String },
  street: { type: String },
  zip: { type: Number },
},{
    _id: false
});

const userSchema = new Schema<IUser, Model<IUser>, UserInstanceMethods> (
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
      unique: true,
      //   validate: {
      //     validator: function (v) {
      //       return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i.test(v);
      //     },
      //     message: function (props) {
      //       return `${props.value} is not a valid email!`;
      //     },
      //   },
      validate: [validator.isEmail],
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
    address: {
        type: addressSchema
    },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

userSchema.method("hasPassword", async function(plainPassword: string){
    const bcryptPassword = await bcrypt.hash(plainPassword, 10)
    return bcryptPassword
})

export const User = model<IUser>("User", userSchema);
