const express = require("express");

const authMiddleware = require("../middleware/authMiddleware");
const { createResturantController, getAllResturantController, getAllResturantByIdController,deleteResturantController } = require("../controllers/resturantControllers");

const router = express.Router();
// routes
router.post('/create',authMiddleware,createResturantController);
router.get('/getAll',getAllResturantController)

// Get Resturant By ID ||GET
router.get('/get/:id',getAllResturantByIdController)
// delete Resturant || DELETE
router.delete('/delete/:id',authMiddleware,deleteResturantController)
module.exports = router;

