const express = require("express");
const cors = require("cors");

const bidRoutes = require("./routes/bidRoutes");
const { startProducer } = require("../kafka/producer");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api", bidRoutes);

app.get("/", (req, res) => {
  res.json({
    message: "RTB Gateway Service Running",
  });
});

const PORT = 5000;

async function startServer() {
  try {
    await startProducer();

    app.listen(PORT, () => {
      console.log(`Gateway running on port ${PORT}`);
    });
  } catch (error) {
    console.error("Failed to start Gateway:", error);
  }
}

startServer();