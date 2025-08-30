const User = require('../models/user');
const mongoose = require('mongoose');


// POST - Create a new user

async function handelCreateUsers(req, res) {
    try {
        const body = req.body;

        if (!body || !body.first_name || !body.last_name || !body.email || !body.gender || !body.job_title) {
            return res.status(400).json({ msg: "All fields are required" });
        }

        await User.create({
            firstName: body.first_name,
            lastName: body.last_name,
            email: body.email,
            gender: body.gender,
            jobTitle: body.job_title
        });

        return res.status(201).json({ msg: "User created successfully" });
    } catch (error) {
        res.status(500).json({ msg: "Server error", error: error.message });
    }
}

// GET - Fetch all users

async function handelGetAllUsers(req, res) {
    try {
        const allDBUsers = await User.find({});
        return res.json(allDBUsers);
    } catch (error) {
        res.status(500).json({ msg: "Server error", error: error.message });
    }
}


// GET - Fetch user by ID

async function handleGetUserById(req, res) {
    try {
        const user = await User.findById(req.params.id);
        if (!user) return res.status(404).json({ message: "User not found" });
        res.json(user);
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
}

// PATCH - Update user by ID

async function handleUpdateUserById(req, res) {
    try {
        const { id } = req.params;

        // Validate ObjectId
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ message: "Invalid user ID" });
        }

        // update data
        const updateData = {
            firstName: req.body.first_name,
            lastName: req.body.last_name,
            email: req.body.email,
            gender: req.body.gender,
            jobTitle: req.body.job_title,
        };

        // Remove undefined fields (not provided in request)
        Object.keys(updateData).forEach(key => updateData[key] === undefined && delete updateData[key]);

        // Update user
        const updatedUser = await User.findByIdAndUpdate(
            id,
            updateData,
            { new: true, runValidators: true }
        );

        if (!updatedUser) {
            return res.status(404).json({ message: "User not found" });
        }

        res.json(updatedUser);
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
}

async function handledeleteUserById(req, res) {
    try {
        const deletedUser = await User.findByIdAndDelete(req.params.id);
        if (!deletedUser) return res.status(404).json({ message: "User not found" });
        return res.json({ message: "User deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
}

module.exports = {
    handelGetAllUsers,
    handelCreateUsers,
    handleGetUserById,
    handleUpdateUserById,
    handledeleteUserById
}