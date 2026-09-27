const express = require("express");

const { getUserController, updateUserController, resetPasswordController, updatePasswordController, deleteProfileController, } = require("../controllers/userController");

const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

// GET USER || GET
router.get("/getUser", authMiddleware, getUserController);

// UDATE Profile
router.put('/updateUser',authMiddleware,updateUserController)

// Password Update
router.post('/updatePassword',authMiddleware,updatePasswordController)

// Reset password
router.post('/resetPassword',authMiddleware,resetPasswordController)

// delete User 

router.delete('/deleteUser/:id',authMiddleware,deleteProfileController)
module.exports = router;

