const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json()); 

const TEST_DURATION = 20 * 60; 
let testStartTime = null; 


app.post("/start", (req, res) => {
  testStartTime = Math.floor(Date.now() / 1000);
  res.json({
    startTime: testStartTime,
    duration: TEST_DURATION,
    message: "Test started successfully",
  });
});


app.get("/time", (req, res) => {
  if (testStartTime === null) {
    return res.json({
      serverTime: Math.floor(Date.now() / 1000),
      startTime: null,
      remaining: TEST_DURATION,
    });
  }

  const now = Math.floor(Date.now() / 1000);
  const elapsed = now - testStartTime;
  const remaining = Math.max(TEST_DURATION - elapsed, 0);

  res.json({
    serverTime: now,
    startTime: testStartTime,
    remaining,
  });
});

const PORT = 4000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});