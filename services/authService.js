const bcrypt = require("bcryptjs");
const User = require("../models/User");


const registerUser = async (name, email, password) => {

    // Check if a user with this email already exists
    const existingUser = await User.findOne({ email });

    // Stop registration if email already exists
    if (existingUser) {
        throw new Error("Email already registered");
    }

    // Convert the plain password into a secure hash
    const passwordHash = await bcrypt.hash(password, 10);

    // Create a new User document
    const user = new User({
        name,
        email,
        passwordHash
    });

    // Save the user document into MongoDB
    await user.save();

    // Return the newly created user
    return user;
};

module.exports = {
    registerUser
};