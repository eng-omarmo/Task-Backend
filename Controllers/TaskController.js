
//desc  get all tasks
//route get :api/tasks
//access private
const getTasks = (req, res) => {
    res.status(200).json({ message: "get Tasks" })
}


//desc Create new task
//route  post: api/tasks
//access private
const createTask = (req, res) => {
    res.status(200).json({ message: "create Task" })
}

//desc  update
//route  Put: api/tasks/:id
//access private
const updateTask = (req, res) => {
    res.status(200).json({ message: "create Task" })
}


//desc  delete
//route  delete: api/tasks/:id
//access private
const deleteTask = (req, res) => {
    res.status(200).json({ message: "create Task" })
}




module.exports = {
    getTasks,
    createTask,
    updateTask,
    deleteTask,

}