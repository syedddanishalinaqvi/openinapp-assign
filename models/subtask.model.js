import mongoose from'mongoose';

const SubTaskSchema=new mongoose.Schema({
    taskId: { 
        type: mongoose.Schema.Types.ObjectId,
        ref: 'task', 
        required: true 
    },
    status:{
        type:Number,
        default:0,
        required:true,
    },
    deletedAt: {
        type: Date,
    }

},{
    timestamps:true,
})

export const SubTask=mongoose.model("subtask",SubTaskSchema);