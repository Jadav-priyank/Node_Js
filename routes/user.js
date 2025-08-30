const express = require("express");

const { handelGetAllUsers, handelCreateUsers,
handleGetUserById, handleUpdateUserById, handledeleteUserById } = require("../controllers/user");

const router = express.Router();


// POST - Create a new user
router.route('/')
.post( handelCreateUsers);

// GET - Fetch all users
router.route('/')
.get(handelGetAllUsers);

router.route('/:id')

    // GET - Fetch user by ID
    .get(handleGetUserById)

    // PATCH - Update user by ID
    .patch(handleUpdateUserById)

    // DELETE - Remove user by ID
    .delete(handledeleteUserById);


module.exports = router;
