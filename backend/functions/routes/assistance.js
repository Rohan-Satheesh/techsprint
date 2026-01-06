const express = require("express");
const router = express.Router();
const { db } = require("../utils/firebase");

router.post("/request", async (req, res) => {
  const { userId, type, location } = req.body;

  const ref = await db.collection("assistance_requests").add({
    userId,
    type,
    location,
    status: "pending",
    createdAt: new Date()
  });

  res.json({ requestId: ref.id });
});

module.exports = router;
