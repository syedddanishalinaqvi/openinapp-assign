import { SubTask } from "../models/subtask.model.js";
import { Task } from "../models/task.model.js";
import { asyncHandler } from "../utils/asyncHandler.js";


const newSubTaskController = (asyncHandler(async (req, res) => {
    try {
        const { taskId } = req.body;
        const task = await Task.findById(taskId);
        if (!task) {
            res.status(400).json({
                message: "No task with this id"
            })
        }
        else {
            const newTask = await SubTask.create(
                {
                    taskId: taskId,
                }
            );
            res.status(200).json({
                data: newTask,
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

const subTaskDeleteController = (asyncHandler(async (req, res) => {
    try {
        const deleteSubTask = await SubTask.findById(req.params.id);
        if (!deleteSubTask) {
            res.status(400).json({
                message: "No sub task with this id"
            })
        }
        else {
            deleteSubTask.deletedAt = Date.now();
            const deletedSubTask = await deleteSubTask.save();
            res.status(200).json({
                message: "Soft deleted",
                data: deletedSubTask,
            })
        }
    }
    catch (err) {
        res.status(400).json({
            message: "Internal error"
        })
    }

}));

const subTaskUpdateController = (asyncHandler(async (req, res) => {
    try {
        const { status } = req.body;
        if (status !== "0" && status !== "1") {
            res.status(401).json({
                message: "Wrong value",
            })
        }
        else {
            const updateSubTask = await SubTask.findById(req.params.id);
            if (!updateSubTask) {
                res.status(400).json({
                    message: "No sub task with this id"
                })
            }
            else {
                updateSubTask.status = status;
                const updatedSubTask = await updateSubTask.save();
                res.status(200).json({
                    message: "Updated Sub task",
                    data: updatedSubTask,
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

const allSubTaskController = (asyncHandler(async (req, res) => {
    try{
    const userId = req.user.id;
    const { taskId } = req.body;

    const tasks = await Task.find({ userId: userId });

    let subtasks = [];
    if (taskId) {
        const newSubTasks = await SubTask.find({ taskId: taskId });
        subtasks = newSubTasks;
    }
    else {
        const subtasksPromises = tasks.map(async (task) => {
            const newSubTasks = await SubTask.find({ taskId: task._id });
            return newSubTasks;
          });
      
          const subtasksArrays = await Promise.all(subtasksPromises);
          subtasks = subtasksArrays.flat();
    }
    res.status(200).json({
        message: "Success",
        data: subtasks,
    })
}
catch(err){

}



}))

export { newSubTaskController, subTaskDeleteController, subTaskUpdateController, allSubTaskController }