const express = require("express");
const router = express.Router();
const { db } = require("../utils/firebase");

router.get("/balance/:userId", async (req, res) => {
  const { userId } = req.params;

  const doc = await db.collection("fastag").doc(userId).get();

  if (!doc.exists) {
    await db.collection("fastag").doc(userId).set({
      balance: 180,
      lastUpdated: new Date()
    });
    return res.json({ balance: 180 });
  }

  res.json(doc.data());
});

module.exports = router;
