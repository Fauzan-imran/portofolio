const express = require("express");
const router = express.Router();
const testimoniController = require("../controller/testimoniController");

router.get("/", testimoniController.getAllTestimoni);
router.get("/:id", testimoniController.getTestimoniById);
router.post("/", testimoniController.createTestimoni);
router.put("/:id", testimoniController.updateTestimoni);
router.delete("/:id", testimoniController.deleteTestimoni);

module.exports = router;