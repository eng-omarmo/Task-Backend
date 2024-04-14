const Task = require('../Models/taskModel')
//desc  get all tasks
//route get :api/tasks
//access private
const getTasks = async (req, res) => {
    try {
        const tasks = await Task.find({_id:req.user._id});
        if (!tasks || tasks.length === 0) {
            return res.status(404).json({ message: "No tasks found" });
        }
        res.status(200).json({ message: tasks });
    } catch (error) {
        console.error("Error fetching tasks:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
}


//desc Create new task
//route  post: api/tasks
//access private
const createTask = async (req, res) => {
    try {
        const { title, description, dueDate, status } = req.body;

        // Check if all required fields are provided
        if (!title || !description || !dueDate) {
            return res.status(400).json({ message: "All fields are required" });
        }

        // Get the user ID from the request
        const userId = req.user._id;

        // Check if the task already exists
        const existingTask = await Task.findOne({ title, description, dueDate, status, user_id: userId });
        if (existingTask) {
            return res.status(400).json({ message: "Task already exists" });
        }

        // Create a new task with the user ID
        const newTask = new Task({ title, description, dueDate, status, user_id: userId });
        await newTask.save();

        // Respond with success message
        res.status(200).json({ message: "Task successfully created", task: newTask });
    } catch (error) {
        console.error("Error creating task:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
};



//desc  update
//route  Put: api/tasks/:id
//access private
const updateTask = async (req, res) => {
    try {
        // Find the task by ID
        const task = await Task.findById(req.params.id);
        if (!task) {
            return res.status(404).json({ message: "Task not found" });
        }

        // Verify that the task belongs to the authenticated user
        if (task.user_id.toString() !== req.user._id.toString()) {
            return res.status(401).json({ message: "Not authorized to update this task" });
        }

        // Update the task with the request body data
        await Task.findByIdAndUpdate(req.params.id, req.body, { new: true });

        res.status(200).json({ message: 'Task successfully updated' });
    } catch (error) {
        console.error("Error updating task:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
};

//desc  delete
//route  delete: api/tasks/:id
//access private
const deleteTask = async (req, res) => {
    try {
        // Find the task by ID
        const task = await Task.findById(req.params.id);
        if (!task) {
            return res.status(404).json({ message: "Task not found" });
        }

        // Verify that the task belongs to the authenticated user
        if (task.user_id.toString() !== req.user._id.toString()) {
            return res.status(401).json({ message: "Not authorized to delete this task" });
        }

        // Delete the task
        await Task.findByIdAndDelete(req.params.id);

        res.status(200).json({ message: "Task successfully deleted" });
    } catch (error) {
        console.error("Error deleting task:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
};




module.exports = {
    getTasks,
    createTask,
    updateTask,
    deleteTask,

}