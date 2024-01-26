import { Task } from "../models/task.model.js";
import { asyncHandler } from "../utils/asyncHandler.js";


const newTaskController = (asyncHandler(async (req, res) => {
    try {
        const { title, description, due_date } = req.body;
        if ([title, description, due_date].some(field => field.trim()) === "") {
            res.status(400).json({
                message: "Enter some data",
            })
        }
        else {
            const task = await Task.create(
                {
                    title,
                    description,
                    due_date,
                    userId: req.user._id
                }
            );
            res.status(200).json({
                data: task,
                message: "Task added"
            })

        }
    }
    catch {
        res.status(400).json({
            message: "Internal Error",
        })
    }
}));

const taskDeleteController = (asyncHandler(async (req, res) => {
    try {
        const deletePost = await Task.findById(req.params.id);
        if (!deletePost) {
            res.status(400).json({
                message: "No post with this id"
            })
        }
        else {
            deletePost.deletedAt = Date.now();
            const deletedTask = await deletePost.save();
            res.status(200).json({
                message: "Soft deleted",
                data: deletedTask,
            })
        }
    }
    catch (err) {
        res.status(400).json({
            message: "Internal error"
        })
    }

}));

const taskUpdateController = (asyncHandler(async (req, res) => {
    try {
        const { due_date, status } = req.body;
        if (status !== "DONE" && status !== "TODO") {
            res.status(401).json({
                message: "Wrong value",
            })
        }
        else {
            const updatePost = await Task.findById(req.params.id);
            if (!updatePost) {
                res.status(400).json({
                    message: "No task with this id"
                })
            }
            else {
                updatePost.due_date = due_date;
                updatePost.status = status;
                const updatedTask = await updatePost.save();
                res.status(200).json({
                    message: "Updated",
                    data: updatedTask,
                })
            }
        }
    }
    catch (err) {
        res.status(400).json({
            message: "Internal error"
        })
    }

}));

const allTaskController = (asyncHandler(async (req, res) => {
    const page=1,pageSize=10;
    const tasks = await Task.find({ userId: req.user._id })
    .sort({priority:1,due_date:1})
    .skip((page-1)*pageSize)
    .limit(pageSize);
    if (tasks.length === 0) {
        res.status(401).json({
            message: "No tasks for this user",
        })
    }
    else {
        res.status(200).json({
            data: tasks,
        })
    }

}))

export { newTaskController, taskDeleteController, taskUpdateController, allTaskController }