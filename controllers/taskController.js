import Task from "../models/Task.js"

const  CreateTask = async (req, res) =>{
    try {
        const task = await Task.create({...req.body, userId: req.user.id})
        res.status(200).json({
            message: "Task Created Successfully",
            task
        })
    } catch (error) {
        return res.status(500).json({
            message: "Error occurred while creating task"
        })
    }
}

const  GetTasks = async (req, res) =>{
    try {
        const tasks = await Task.find({userId: req.user.id})
        res.status(200).json({
            message: "Tasks Retrieved Successfully",
            tasks
        })
    } catch (error) {
        return res.status(500).json({
            message: "Error occurred while retrieving tasks"
        })
    }
}


const  GetTaskbyId = async (req, res) =>{
    try {
        const task = await Task.findById(req.params.id)
       
        if(!task){
            return res.status(404).json({
                message: "Task not found"
            })
        }

        if(task.userId.toString() !== req.user.id){
            return res.status(403).json({
                message: "You are not authorized to view this task"
            })
        }

        res.status(200).json({
            message: "Task Retrieved Successfully",
            task
        })
    } catch (error) {
        return res.status(500).json({
            message: "Error occurred while retrieving task"
        })
    }
}


const  UpdateTask = async (req, res) =>{
    try {
        const task= await Task.findById(req.params.id)
       
        if(!task){
            return res.status(404).json({
                message: "Task not found"
            })
        }

        if(task.userId.toString() !== req.user.id){
            return res.status(403).json({
                message: "You are not authorized to update this task"
            })
        }

        const updatetask =  await Task.findByIdAndUpdate(req.params
            .id, req.body, {new: true}
        )
        res.status(200).json({
            message: "Task Updated Successfully",
            task: updatetask
        })
    } catch (error) {
        return res.status(500).json({
            message: "Error occurred while updating task"
        })
    }
}


const  DeleteTask = async (req, res) =>{
    try {
        const task= await Task.findById(req.params.id)
        if(!task){
            return res.status(404).json({
                message: "Task not found"
            })
        }
        if(task.userId.toString() !== req.user.id){
            return res.status(403).json({
                message: "You are not authorized to delete this task"
            })
        }
        const deletedTask = await Task.findByIdAndDelete(req.params.id)
        res.status(200).json({
            message: "Task Deleted Successfully",
            task: deletedTask
        })
    } catch (error) {
        return res.status(500).json({
            message: "Error occurred while deleting task"
        })
    }
}

export { CreateTask, GetTasks, GetTaskbyId, UpdateTask, DeleteTask }