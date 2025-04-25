import mongoose from "mongoose";

//It  will store the user response
const responseSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "user", required: true },
    topic: { type: String, required: true },
    score:{type:Number,required:true},
    responsedata:[{
      question: { type: String, required: true },
      selectedAnswer: {type:String,required:true},
      correctAnswer: {type:String,required:true},
      isCorrect: {type:Boolean,required:true},
    }],
    timestamp: { type: Date, default: Date.now }
  })
  

const responseModel=mongoose.model('userresponse',responseSchema);
export default responseModel;