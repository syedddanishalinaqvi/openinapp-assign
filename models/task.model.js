import mongoose from 'mongoose';

const TaskSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
        required: true
    },
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        require: true,
    },
    due_date: {
        type: Date,
        required: true
    },
    status: {
        type: String,
        default: "TODO",
        required: true,
    },
    priority:{
        type:Number,
    },
    deletedAt: {
        type: Date,
    }

}, {
    timestamps: true,
})

export const Task = mongoose.model("task", TaskSchema);