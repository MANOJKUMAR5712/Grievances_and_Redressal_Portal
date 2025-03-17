import express from 'express'
import mongoose from 'mongoose'
import grievances from '../model/Grievances.model.js';

export const router = express.Router();

router.get('/',async(req,res)=>{
    try {
        const grievance = await grievances.find({})
        return res.status(200).json({success : true , data : grievance})
    } catch (error) {
        res.status(404).json({success : false , message : error.message})
    }
})

router.post('/',async(req,res)=>{
    const newGrievance = req.body

    if(!newGrievance.to || !newGrievance.from || !newGrievance.grievanceType || !newGrievance.subject || !newGrievance.description || !newGrievance.id){
            return res.status(400).json({success : false , message : "Please provide all details"}) }

    const finalGrievance = new grievances(newGrievance);        
    try {
        await finalGrievance.save()
        return res.status(200).json({success : true , data : newGrievance }) 
    } catch (error) {
        console.log("Error : ", error.message)
        return res.status(500).json({success : false , message : error.message})
    }
})

router.put('/:id',async (req,res)=>{
    const {id} = req.params ;
    const newGrievance = req.body ;
    
    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({success : false , message : "Grievance id Invalid"})
    } ;

    try {
        const updatedGrievance  = await grievances.findByIdAndUpdate(id,newGrievance,{new : true})
        return res.status(200).json({success : true , data : updatedGrievance});
    } catch (error) {
        return res.status(500).json({success :false , message : 'Server Error'})
    }
}) ;

router.delete('/:id',async (req,res)=>{
    const {id} = req.params;

    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({success : false , message : "Grievance id Invalid"})
    }

    try{
        await grievances.findByIdAndDelete(id);
        return res.status(200).json({success : true , message : "Grievance deleted"});
    }catch(error){
        return res.status(500).json({success : false , message : "Server Error"});
    }
}) ; 

// export default router ;