const router = require("express").Router();
const Tracking = require("../models/Tracking");
const auth = require("../middleware/auth");

router.post("/", auth, async (req, res) => {
  const { domain, duration } = req.body;

  const entry = new Tracking({
    userId: req.user.id,
    domain,
    duration
  });

  await entry.save();
  res.send("Saved");
});

router.get("/report", auth, async (req, res) => {
  const data = await Tracking.find({ userId: req.user.id });

  const report = {};

  data.forEach(item => {
    report[item.domain] = (report[item.domain] || 0) + item.duration;
  });

  res.json(report);
});

module.exports = router;