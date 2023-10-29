import { Schema, model } from "mongoose";

const userSchema = new Schema({
    name: {
        type: String,
        default: "-",
    },
    email: {
        type: String,
        unique:true,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    mobile: {
        type: String,
        required:true,
        unique:true,
    },
    address: {
        type: String,
    },
    gender: {
        type: String,
        default: "Prefer not to say",
    },


    // name: String,
    // email: String,
    // password:String,
    // mobile:Number,
    // address:String,
    // gender:String,
});

const User = model("User", userSchema);

export default User;