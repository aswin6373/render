const express = require("express");
const axios = require("axios");

const app = express();
const PORT = 3000;

app.get("/api", async (req, res) => {
  try {
    const response = await axios.get("https://your-infinityfree-api.com", {
      headers: { "User-Agent": "Mozilla/5.0" }, // Mimic a browser
    });
    res.json(response.data);
  } catch (error) {
    res.status(500).send("Error fetching API");
  }
});

app.listen(PORT, () => console.log(`Proxy running on port ${PORT}`));
