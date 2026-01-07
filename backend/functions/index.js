const { onRequest } = require("firebase-functions/v2/https");
const { onDocumentCreated } = require("firebase-functions/v2/firestore");
const admin = require("firebase-admin");

admin.initializeApp();
const db = admin.firestore();

/* ----------------------------------------
   STEP 4: API TO ACCEPT REPORTS (WITH SPAM CHECK)
----------------------------------------- */

exports.submitReport = onRequest(async (req, res) => {
  try {
    const { type, latitude, longitude } = req.body;

    // 1️⃣ Basic validation
    if (!type || !latitude || !longitude) {
      return res.status(400).json({
        success: false,
        message: "Missing required fields"
      });
    }

    // 2️⃣ Time window (last 24 hours)
    const now = admin.firestore.Timestamp.now();
    const last1Hour = admin.firestore.Timestamp.fromMillis(
      now.toMillis() - 1 * 60 * 60 * 1000
    );

    // 3️⃣ Check for duplicate reports
    const duplicateQuery = await db
      .collection("reports")
      .where("type", "==", type)
      .where("latitude", "==", latitude)
      .where("longitude", "==", longitude)
      .where("createdAt", ">=", last1Hour)
      .get();

    if (!duplicateQuery.empty) {
      return res.status(409).json({
        success: false,
        message: "Duplicate report in last 1 hour"
      });
    }

    // 4️⃣ Add new report
    await db.collection("reports").add({
      type,
      latitude,
      longitude,
      createdAt: admin.firestore.FieldValue.serverTimestamp()
    });

    return res.status(201).json({
      success: true,
      message: "Report submitted successfully"
    });

  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Internal server error"
    });
  }
});

/* ----------------------------------------
   STEP 3: AUTO DANGER SCORE CALCULATION
----------------------------------------- */

exports.calculateDangerScore = onDocumentCreated(
  "reports/{reportId}",
  async (event) => {

    const reportData = event.data.data();
    let dangerScore = 0;

    if (reportData.type === "accident") {
      dangerScore = 5;
    }
    else if (reportData.type === "harassment") {
      dangerScore = 4;
    }
    else if (reportData.type === "dark_area") {
      dangerScore = 3;
    }
    else if (reportData.type === "broken_streetlight") {
      dangerScore = 2;
    }
    else if (reportData.type === "unsafe_area") {
      dangerScore = 3;
    }
    else {
      dangerScore = 1;
    }

    await event.data.ref.update({
      dangerScore,
      processedAt: admin.firestore.FieldValue.serverTimestamp()
    });

    console.log(
      `Danger score ${dangerScore} added for report type: ${reportData.type}`
    );
  }
);
// 🔴 SOS ALERT HANDLER
exports.handleSOSAlert = onDocumentCreated(
  "sos_alerts/{sosId}",
  async (event) => {

    const sosData = event.data.data();
    const sosId = event.params.sosId;

    // 1️⃣ SOS is always critical
    const dangerScore = 10;

    // 2️⃣ Update SOS document
    await event.data.ref.update({
      dangerScore: dangerScore,
      status: "active",
      processedAt: admin.firestore.FieldValue.serverTimestamp()
    });

    // 3️⃣ Create notification for police / dashboard
    const notification = {
      type: "SOS",
      relatedId: sosId,
      recipientType: "police",
      recipientId: "nearest_police_demo", // later replace with real logic
      message: "🚨 SOS Alert triggered. Immediate attention required.",
      location: sosData.location || null,
      status: "pending",
      createdAt: admin.firestore.FieldValue.serverTimestamp()
    };

    await db.collection("notifications").add(notification);

    console.log(`🚨 SOS alert processed for user ${sosData.userId}`);
  }
);

exports.someApi = functions.https.onRequest((req, res) => {
  res.json({ message: "Hello from backend" });
});

const functions = require("firebase-functions");
const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

app.get("/health", (req, res) => {
  res.json({ status: "OK" });
});

// 👇 THIS LINE MUST BE LAST
exports.api = functions.https.onRequest(app);


