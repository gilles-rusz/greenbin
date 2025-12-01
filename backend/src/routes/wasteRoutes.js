const express = require("express");
const router = express.Router();
const wasteController = require("../controllers/wasteController");
const auth = require("../middleware/authMiddleware");

// Routes 
router.get("/", wasteController.getAll);
router.get("/:id", wasteController.getById);
router.post("/", auth, wasteController.create); 
router.put("/:id", auth, wasteController.update);
router.delete("/:id", auth, wasteController.delete);

module.exports = router;
