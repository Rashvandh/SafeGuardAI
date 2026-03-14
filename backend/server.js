const express = require("express");
const cors = require("cors");
const path = require("path");
const { query, run } = require("./db");
const { v4: uuidv4 } = require("uuid");

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors({ origin: "*" }));
app.use(express.json());

// Serve frontend static files from the built dist folder
const distPath = path.join(__dirname, "..", "dist");
app.use(express.static(distPath));

// --- Emergency Contacts ---
app.get("/api/contacts", async (req, res) => {
  try {
    const contacts = await query("SELECT * FROM Contact ORDER BY createdAt DESC");
    res.json(contacts);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.post("/api/contacts", async (req, res) => {
  const { name, phone, relationship } = req.body;
  const id = uuidv4();
  try {
    await run(
      "INSERT INTO Contact (id, name, phone, relationship) VALUES (?, ?, ?, ?)",
      [id, name, phone, relationship || "Other"]
    );
    res.status(201).json({ id, name, phone, relationship: relationship || "Other" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.delete("/api/contacts/:id", async (req, res) => {
  try {
    await run("DELETE FROM Contact WHERE id = ?", [req.params.id]);
    res.json({ message: "Contact deleted" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// --- Reports ---
app.post("/api/reports", async (req, res) => {
  const { name, location, description } = req.body;
  const id = uuidv4();
  try {
    await run(
      "INSERT INTO Report (id, name, location, description) VALUES (?, ?, ?, ?)",
      [id, name, location, description]
    );
    res.status(201).json({ id, name, location, description });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// --- SOS ---
app.post("/api/sos", async (req, res) => {
  const { lat, lng } = req.body;
  const id = uuidv4();
  try {
    await run("INSERT INTO SOS (id, lat, lng) VALUES (?, ?, ?)", [id, lat, lng]);
    res.status(201).json({ message: "SOS Received", id });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// --- Safety Check ---
const dangerWords = ["help", "danger", "attack", "follow", "kill", "threat", "kidnap", "assault", "rape", "murder"];
const warningWords = ["unsafe", "scared", "worry", "nervous", "suspicious", "alone", "dark", "stranger"];

app.post("/api/safety-check", (req, res) => {
  const { message } = req.body;
  if (!message) return res.status(400).json({ error: "Message is required" });

  const lower = message.toLowerCase();
  let status = "safe";

  if (dangerWords.some((w) => lower.includes(w))) {
    status = "danger";
  } else if (warningWords.some((w) => lower.includes(w))) {
    status = "warning";
  }

  res.json({ status });
});

// Catch-all: serve React app for any non-API route
app.get("*", (req, res) => {
  res.sendFile(path.join(distPath, "index.html"));
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
