//Suggest ithe learing resourse

import { generateMastery } from "../utils/generateMastery.js";
import { suggestLearningPath } from "../utils/suggestMaterial.js";
export const getrecommendation=async (req,res) => {
    try {
        const {topic,subject}=req.body;
        console.log("req.body:", req.body);
        console.log(topic,subject);

        if(!topic||topic.length===0){
            return res.json({success:true,message:"No weak topics provided!"});

        }
        const resources=await suggestLearningPath(topic,subject);
        res.json({success:true,message:"Recommended resource successfully!",resources})
        
    } catch (error) {
        res.json({success:false,message:"failed to fetch recommendations ",error})
        console.log(error);
    }
    
}
export const getMastery=async (req,res) => {
    try {
        const {topic,subject}=req.body;
        if(!topic||topic.length===0){
           return res.json({success:true,message:"Not topic provied!"})
        }
        const response=await generateMastery(topic,subject);
        res.json({sucess:true,message:"Recommended resurce successfully!",response})
    } catch (error) {
        res.json({ success: false, message: "Failed to fetch recommendation!", error: error.message });

        console.log(error);
    }
}