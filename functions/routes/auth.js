const express = require("express");
const router = express.Router();
const { auth, db } = require("../utils/firebase");

router.post("/signup", async (req, res) => {
  const { email, password, name, phone } = req.body;

  try {
    const user = await auth.createUser({ email, password });

    await db.collection("users").doc(user.uid).set({
      name,
      phone,
      createdAt: new Date()
    });

    res.status(201).json({ userId: user.uid });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

module.exports = router;
