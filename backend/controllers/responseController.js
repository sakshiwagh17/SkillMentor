//Store the response and calculate the score
import responseModel from "../models/responseModel.js";

export const saveQuizResponse=async (req,res) => {
    try {
        const {userId,quizData,topic,score}=req.body;
        const newResponse=new responseModel({
            userId,topic,score,responsedata:quizData
        })
        await newResponse.save();
        res.json({success:true,message:"Response save scuessfully!!"})
        
    } catch (error) {
        res.json({success:false,message:"Error in saving the response!"})
    }
    
}