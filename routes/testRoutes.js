const { testUserController } = require("../controllers/testController");

const express = require("express");

// Router object
const router = express.Router();

// Routes
router.get("/test-user", testUserController);

// Export
module.exports = router;