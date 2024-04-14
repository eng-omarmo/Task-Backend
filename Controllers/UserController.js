
const User = require('../Models/UserModel')
const jsonwebtoken = require('jsonwebtoken')
const bicrypt = require('bcrypt')
//get user information
const getUser = async (req, res) => {
 try {
    const users = await User.find()
    if (!users.length) {
        return res.status(404).json({ message: "No users found" })
    }
    res.status(200).json({ message: users })
 } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).json({ message: "Internal Server Error" });
}
}

const createUser = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        
        // Check if all required fields are present
        if (!name || !email || !password) {
            return res.status(400).json({ message: "All fields are required" });
        }
        
        // Check if a user with the same email already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: "User already exists" });
        }
        
        // Hash the password
        const hashedPassword = bicrypt.hashSync(password, 10);
        
        // Create a new user in the database
        await User.create({ name, email, password: hashedPassword });
        token = generateToken(user._id)
        
        // Send a success response
        res.status(200).json({ message: `New user created successfully ${token}` });
    } catch (error) {
        console.error("Error creating user:", error);
        // Send an error response
        res.status(500).json({ message: "Internal Server Error" });
    }
};

//update user 
const updateUser = (req, res) => {
    res.status(200).json({ message: "update User" })
}

//delete user
const deleteUser = (req, res) => {
    res.status(200).json({ message: "delete  User" })
}
const generateToken = (userId) => {
    // Define the payload for the token
    const payload = {
        userId: userId
    };

    // Define options for the token (e.g., expiration time)
    const options = {
        expiresIn: '1h' // Token expires in 1 hour
    };

    // Generate and return the token
    return jwt.sign(payload, process.env.JWT_SECRET, options);
};


module.exports = {
    getUser,
    createUser,
    updateUser,
    deleteUser

}