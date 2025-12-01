const express = require("express");
const router = express.Router();

const userController = require("../controllers/userController");
const auth = require("../middleware/authMiddleware");
const isAdmin = require("../middleware/adminMiddleware");

router.get("/", auth, isAdmin, userController.getAll);
router.get("/:id", auth, isAdmin, userController.getById);
router.post("/", auth, isAdmin, userController.create);
router.put("/:id", auth, isAdmin, userController.update);
router.delete("/:id", auth, isAdmin, userController.delete);

module.exports = router;
