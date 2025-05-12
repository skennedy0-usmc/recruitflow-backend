const express = require("express");
const router = express.Router();
const pool = require("../db"); // adjust if needed

// ==========================
// 📄 GET /interviews — all enriched interviews
// ==========================
router.get("/", async (req, res) => {
  try {
    const result = await pool.query(`
      SELECT i.id, i.link_id, i.type, i.interviewer, i.scheduled_at,
             c.name AS candidate_name,
             r.title AS requisition_title
      FROM interviews i
      JOIN candidate_requisitions cr ON i.link_id = cr.id
      JOIN candidates c ON cr.candidate_id = c.id
      JOIN requisitions r ON cr.requisition_id = r.id
      ORDER BY i.scheduled_at
    `);
    res.json(result.rows);
  } catch (error) {
    console.error("❌ Error fetching interviews:", error);
    res.status(500).json({ error: "Failed to retrieve interviews" });
  }
});

// ==========================
// 🆕 POST /interviews — schedule new
// ==========================
router.post("/", async (req, res) => {
  console.log("Incoming interview payload:", req.body);

  const { link_id, type, interviewer, scheduled_at } = req.body;

  if (!link_id || !type || !interviewer || !scheduled_at) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  try {
    const result = await pool.query(
      `INSERT INTO interviews (link_id, type, interviewer, scheduled_at)
       VALUES ($1, $2, $3, $4)
       RETURNING *`,
      [link_id, type, interviewer, scheduled_at]
    );
    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error("❌ Error inserting interview:", error);
    res.status(500).json({ error: "Server error" });
  }
});

// ==========================
// ✏️ PUT /interviews/:id — update
// ==========================
router.put("/:id", async (req, res) => {
  const { id } = req.params;
  const { link_id, type, interviewer, scheduled_at } = req.body;

  if (!link_id || !type || !interviewer || !scheduled_at) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  try {
    const result = await pool.query(
      `UPDATE interviews
       SET link_id = $1, type = $2, interviewer = $3, scheduled_at = $4
       WHERE id = $5 RETURNING *`,
      [link_id, type, interviewer, scheduled_at, id]
    );
    res.json(result.rows[0]);
  } catch (error) {
    console.error("❌ Error updating interview:", error);
    res.status(500).json({ error: "Failed to update interview" });
  }
});

// ==========================
// 🗑️ DELETE /interviews/:id
// ==========================
router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    await pool.query("DELETE FROM interviews WHERE id = $1", [id]);
    res.sendStatus(204);
  } catch (error) {
    console.error("❌ Error deleting interview:", error);
    res.status(500).json({ error: "Failed to delete interview" });
  }
});

module.exports = router;
