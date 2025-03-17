import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
    username : {type : String , required : false , unique : false},
    email : {type : String , required : false},
    role : {type : String , required : false , default : "student" , enum : ["admin","student","teacher"]},
    googleId : {type : String , required : false},
})

// const user = mongoose.model("Users",UserSchema);

export default mongoose.models.User || mongoose.model("User", UserSchema);