const router = require("express").Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const authMiddleWare = require("../middleware/AuthMiddleware.js");

// Load User modal
const User = require("../models/User");

// @route   GET /user/:id
// @desc    Get a user
// @access  Private
router.get('/:id', async(req, res) => {
    const id = req.params.id;
    try {
        const user = await User.findById(id);
        if (user) {
            const { password, ...otherDetails } = user._doc;
            res.status(200).json(otherDetails); 
        } else {
            res.status(404).json("No such user");
        }
    } catch (error) {
        res.status(500).json(error);
    }
});

// @route   GET /user/
// @desc    Get all users
// @access  Private

router.get('/', async(req, res) => {
    try {
        const users = await User.find();
        // users = users.map((user) => {
        //     const { password, ...otherDetails } = user._doc;
        //     return otherDetails
        // });
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json(error);
    }
});

// @route   Put /user/:id
// @desc    Update a user
// @access  Private
router.put('/:id', async(req, res) => {
    const id = req.params.id;
    const { _id, currentUserAdmin, password } = req.body;

    if (id === _id) {
        try {
            // If we have to update the password then it will be bcrypted again
            if (password) {
                const salt = await bcrypt.genSalt(10);
                req.body.password = await bcrypt.hash(password, salt);
            }
            const user = await User.findByIdAndUpdate(id, req.body, {
                new: true,
            });
            const token = jwt.sign(
                { username: user.username, id: user._id },
                process.env.JWTKEY,
                { expiresIn: "1h" }
            );
            console.log({user, token})
            res.status(200).json({user, token});
        } catch (error) {
            res.status(500).json(error);
        }
    } else {
        res.status(403).json("Access Denied! You can update only your own Account.");
    }
});

// @route   DELETE /user/:id
// @desc    Delete a user
// @access  Private
router.delete('/:id', async(req,res) => {
    const id = req.params.id;
    const { currentUserId, currentUserAdmin } = req.body;
    if (currentUserId == id || currentUserAdmin) {
        try {
            await User.findByIdAndDelete(id);
            res.status(200).json("User Deleted Successfully!");
        } catch (error) {
            res.status(500).json(error);
        }
    }else {
        res.status(403).json("Access Denied!");
    }
});

// @route   PUT /user/:id/follow
// @desc    follow a user
// @access  Private
router.put('/:id/follow', async(req,res) => {
    const id = req.params.id;
    const { _id } = req.body;
    console.log(id, _id);
    if (_id == id) {
        res.status(403).json("Action Forbidden");
    } else {
        try {
            const followUser = await User.findById(id);
            const followingUser = await User.findById(_id);
            if (!followUser.followers.includes(_id)) {
                await followUser.updateOne({ $push: { followers: _id } });
                await followingUser.updateOne({ $push: { following: id } });
                res.status(200).json("User followed!");
            } else {
                res.status(403).json("You are already following this person");
            }
        } catch (error) {
            res.status(500).json(error);
        }
    }
});

module.exports = router;