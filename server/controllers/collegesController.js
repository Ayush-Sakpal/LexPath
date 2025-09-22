import pool from "../config/db.js";

// ===== Get All Colleges =====
export const getColleges = async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM colleges ORDER BY created_at DESC");
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// ===== Get Single College =====
export const getCollegeById = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await pool.query("SELECT * FROM colleges WHERE id = $1", [id]);
    if (result.rows.length === 0) return res.status(404).json({ message: "College not found" });
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// ===== Create College =====
export const createCollege = async (req, res) => {
  try {
    const {
      name, type, location, city, state, country, established_year,
      affiliation, accreditation, ranking, courses_offered, website,
      contact_email, contact_phone, description, facilities, placement_info,
      admission_process, fees_structure, logo_url, images
    } = req.body;

    const result = await pool.query(
      `INSERT INTO colleges
      (name, type, location, city, state, country, established_year,
       affiliation, accreditation, ranking, courses_offered, website,
       contact_email, contact_phone, description, facilities, placement_info,
       admission_process, fees_structure, logo_url, images)
      VALUES
      ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11::jsonb,$12,$13,$14,$15,$16::jsonb,
       $17::jsonb,$18,$19::jsonb,$20,$21::jsonb)
      RETURNING *`,
      [
        name, type, location, city, state, country, established_year,
        affiliation, accreditation, ranking, JSON.stringify(courses_offered || []),
        website, contact_email, contact_phone, description,
        JSON.stringify(facilities || {}), JSON.stringify(placement_info || {}),
        admission_process, JSON.stringify(fees_structure || {}), logo_url,
        JSON.stringify(images || [])
      ]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// ===== Update College =====
export const updateCollege = async (req, res) => {
  try {
    const { id } = req.params;
    const fields = Object.keys(req.body);
    const values = Object.values(req.body);

    const setClause = fields.map((f, i) =>
      `${f} = $${i + 1}${["courses_offered", "facilities", "placement_info", "fees_structure", "images"].includes(f) ? "::jsonb" : ""}`
    ).join(", ");

    const query = `UPDATE colleges SET ${setClause} WHERE id = $${fields.length + 1} RETURNING *`;
    const result = await pool.query(query, [...values, id]);

    if (result.rows.length === 0) return res.status(404).json({ message: "College not found" });
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// ===== Delete College =====
export const deleteCollege = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await pool.query("DELETE FROM colleges WHERE id = $1 RETURNING *", [id]);
    if (result.rows.length === 0) return res.status(404).json({ message: "College not found" });
    res.json({ message: "College deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};