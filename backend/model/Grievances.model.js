import mongoose from "mongoose";

const GrievanceSchema = new mongoose.Schema({
    id : {type : String , required : false , unique : true},
    subject : {type : String , required : false },
    description : {type : String , required : false},
    date : {type : String , required : false},
    to : {type : String , required : false},
    from : {type : String , required : false ,},
    grievanceType : {type  : String , required : false , default : "public" , enum : ["public","private"]},
    status : {type : String , required : false , enum : ["resolved","pending"] , default : "pending"}
},{
    timestamps : true
})

const grievances = mongoose.model("Grievances",GrievanceSchema);

export default grievances;