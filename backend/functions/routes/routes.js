const express = require("express");
const axios = require("axios");
const router = express.Router();

router.post("/getRoutes", async (req, res) => {
  const { origin, destination } = req.body;

  try {
    const response = await axios.post(
      "https://routes.googleapis.com/directions/v2:computeRoutes",
      {
        origin: { location: { latLng: origin } },
        destination: { location: { latLng: destination } },
        travelMode: "DRIVE",
        computeAlternativeRoutes: true
      },
      {
        headers: {
          "X-Goog-Api-Key": process.env.MAPS_API_KEY,
          "X-Goog-FieldMask": "routes.distanceMeters,routes.duration,routes.polyline"
        }
      }
    );

    const routes = response.data.routes.map(r => ({
      distance: r.distanceMeters,
      duration: r.duration,
      polyline: r.polyline.encodedPolyline
    }));

    res.json({ routes });
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch routes" });
  }
});

module.exports = router;
