import pool from "../config/db.js";

export const getJobs = async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM jobs ORDER BY created_at DESC");
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const getJobById = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await pool.query("SELECT * FROM jobs WHERE id = $1", [id]);
    if (result.rows.length === 0) return res.status(404).json({ message: "Job not found" });
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const createJob = async (req, res) => {
  try {
    const {
      title, organisation, location, role_type, industry, experience_level,
      skills_required, education_required, salary_range, job_description,
      responsibilities, benefits, openings, posted_date, deadline,
      apply_url, contact_email, contact_phone
    } = req.body;

    const result = await pool.query(
      `INSERT INTO jobs
      (title, organisation, location, role_type, industry, experience_level,
       skills_required, education_required, salary_range, job_description,
       responsibilities, benefits, openings, posted_date, deadline,
       apply_url, contact_email, contact_phone)
      VALUES
      ($1,$2,$3,$4,$5,$6,$7::jsonb,$8,$9,$10,$11,$12::jsonb,$13,$14,$15,$16,$17,$18)
      RETURNING *`,
      [
        title, organisation, location, role_type, industry, experience_level,
        JSON.stringify(skills_required || []), education_required, salary_range,
        job_description, responsibilities, JSON.stringify(benefits || []),
        openings, posted_date, deadline, apply_url, contact_email, contact_phone
      ]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const updateJob = async (req, res) => {
  try {
    const { id } = req.params;
    const fields = Object.keys(req.body);
    const values = Object.values(req.body);

    const setClause = fields.map((f, i) =>
      `${f} = $${i + 1}${["skills_required", "benefits"].includes(f) ? "::jsonb" : ""}`
    ).join(", ");

    const query = `UPDATE jobs SET ${setClause} WHERE id = $${fields.length + 1} RETURNING *`;
    const result = await pool.query(query, [...values, id]);

    if (result.rows.length === 0) return res.status(404).json({ message: "Job not found" });
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const deleteJob = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await pool.query("DELETE FROM jobs WHERE id = $1 RETURNING *", [id]);
    if (result.rows.length === 0) return res.status(404).json({ message: "Job not found" });
    res.json({ message: "Job deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};