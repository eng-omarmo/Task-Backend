
const User = require('../Models/UserModel')
const jwt = require('jsonwebtoken')
const bicrypt = require('bcrypt')
//get user information
const getUser = async (req, res) => {
    try {
           // Check if user id in authenticate middle and the one in url match
            if (req.user._id.toString() !== req.params.id) {
                return res.status(401).json({ message: "Not authorized" });
            }
        const user = await User.findOne({ _id: req.params.id });
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
         
    
        res.status(200).json({ message: user });
    } catch (error) {
        console.error("Error fetching user:", error);
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
        const newUser = await User.create({ name, email, password: hashedPassword });
        token = generateToken(newUser._id)
        // Send a success response
        res.status(200).json({ message: `New user created successfully ${token}` });
    } catch (error) {
        console.error("Error creating user:", error);
        // Send an error response
        res.status(500).json({ message: "Internal Server Error" });
    }
};

//update user 
const updateUser = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        // Check if all required fields are present
        if (!name || !email || !password) {
            return res.status(400).json({ message: "All fields are required" });
        }

        // Check if a user with the provided ID exists
        const user = await User.findById(req.params.id);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        // Check if the email is different from the current user's email
        if (email !== user.email) {
            const existingUser = await User.findOne({ email });
            if (existingUser) {
                return res.status(400).json({ message: "Email already exists" });
            }
        }

        // Check if user id in authenticate middle and the one in url match
        if (req.user._id.toString() !== req.params.id) {
            return res.status(401).json({ message: "Not authorized" });
        }

        // Hash the password
        const hashedPassword = bicrypt.hashSync(password, 10);

        // Update the user in the database
        const updatedUser = await User.findByIdAndUpdate(req.params.id, { name, email, password: hashedPassword }, { new: true });

        res.status(200).json({ message: "User updated successfully", user: updatedUser });
    } catch (error) {
        console.error("Error updating user:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
}


//delete user
const deleteUser = async(req, res) => {
    try {
          // Check if a user with the provided ID exists
          const user = await User.findById(req.params.id);
          if (!user) {
              return res.status(404).json({ message: "User not found" });
          }
           // Check if user id in authenticate middle and the one in url match
        if (req.user._id.toString() !== req.params.id) {
            return res.status(401).json({ message: "Not authorized" });
        }

    await User.findByIdAndDelete(req.params.id)
    
    res.status(200).json({ message: "delete  User successfully" })
        
    } catch (error) {
        console.error("Error deleting user:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
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

//login user
const loginUser = async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
        return res.status(401).json({ message: 'Invalid credentials' });
    }
    const isMatch = bicrypt.compareSync(password, user.password);
    if (!isMatch) {
        return res.status(401).json({ message: 'Invalid credentials' });
    }
    const token = generateToken(user._id);
    res.status(200).json({ message: 'Login successful', token });
}


module.exports = {
    getUser,
    createUser,
    updateUser,
    deleteUser,
loginUser
}