const express = require("express")
const { auth } = require("../Middleware/auth.middleware")
const TaskModel = require("../model/TodoModel.model")

const TodoRouter = express.Router()

TodoRouter.get("/task",auth,async(req,res)=>{
    try {
        const tasks=await TaskModel.find({user:req.user._id})
        console.log(tasks)
        res.status(200).json({msg:tasks})
    } catch (error) {
        res.status(400).json({msg:"error"})
    }
})

TodoRouter.post('/create', auth, async (req, res) => {
  const {title,description,start,end} = req.body
    try {
      const newTask = new TaskModel({
        ...req.body,
        start:new Date(start),
        end:new Date(end),
        user: req.user._id, // Attach the user's ObjectId to the task
      });
      await newTask.save();
      res.status(201).json(newTask);
    } catch (error) {
      console.error('Error creating task:', error);
      res.status(500).json({ error: 'Unable to create task' });
    }
  });


// Update a task (protected route)
TodoRouter.put('/tasks/:taskId', auth, async (req, res) => {
  try {
    const taskId = req.params.taskId;
    
    // Parse date strings into Date objects
    const { start, end, ...rest } = req.body;
    const updatedTaskData = {
      ...rest,
      start: new Date(start),
      end: new Date(end),
    };

    // Ensure the task belongs to the authenticated user
    const updatedTask = await TaskModel.findOneAndUpdate(
      { _id: taskId, user: req.user._id },
      updatedTaskData,
      { new: true }
    );

    if (!updatedTask) {
      return res.status(404).json({ error: 'Task not found' });
    }

    res.status(200).json({ msg: 'Task updated', updatedTask });
  } catch (error) {
    console.error('Error updating task:', error);
    res.status(500).json({ error: 'Unable to update task' });
  }
});

  
// delete a task (protected route)
TodoRouter.delete('/tasks/:taskId', auth, async (req, res) => {
    try {
      const taskId = req.params.taskId;
      const deletedTask = await TaskModel.findOneAndRemove({
        _id: taskId,
        user: req.user._id, // Ensure the task belongs to the authenticated user
      });
  
      if (!deletedTask) {
        return res.status(404).json({ error: 'Task not found' });
      }
  
      res.status(200).json({msg:'task delete',deletedTask});
    } catch (error) {
      console.error('Error deleting task:', error);
      res.status(500).json({ error: 'Unable to delete task' });
    }
});

module.exports={
    TodoRouter
}