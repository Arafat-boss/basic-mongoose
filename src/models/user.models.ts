import { Model, model, Schema } from "mongoose";
import {
  IAddress,
  IUser,
  UserInstanceMethods,
  UserStaticMethods,
} from "../interfaces/user.interfaces";
import validator from "validator";
import bcrypt from "bcryptjs";
import { Note } from "./note.models";

// =================sub document========================
//sub document
const addressSchema = new Schema<IAddress>(
  {
    city: { type: String },
    street: { type: String },
    zip: { type: Number },
  },
  {
    _id: false,
  }
);

//==================schema========================
//instance methods
const userSchema = new Schema<IUser, Model<IUser>, UserInstanceMethods>(
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
      type: addressSchema,
    },
  },
  {
    versionKey: false,
    timestamps: true,
    toJSON: { virtuals: true},
    toObject: { virtuals: true},
  }
);

//=================methods========================
//instance methods
userSchema.method("hasPassword", async function (plainPassword: string) {
  const password = await bcrypt.hash(plainPassword, 10);
  return password;
});
//static methods
userSchema.static("hasPassword", async function (plainPassword: string) {
  const password = await bcrypt.hash(plainPassword, 10);
  return password;
});


//=================hooks========================
//pre hooks
//DOCUMENT MIDDLEWARE
userSchema.pre("save", async function(next){
  this.password = await bcrypt.hash(this.password, 10) 
  next()  
})

//Query middleware
userSchema.pre("find", function(next){
  console.log("after Find");
  next()
})

//post hooks
//post when user be delected then all notes will be deleted
userSchema.post("findOneAndDelete", async function(doc, next){
   if(doc){
    console.log(doc);
     await Note.deleteMany({user: doc._id})
   }
    next()  
})


userSchema.virtual("fullName").get(function(){
  return `${this.firstName} ${this.lastName}`
})


//model
export const User = model<IUser, UserStaticMethods>(
  "User",
  userSchema
);
