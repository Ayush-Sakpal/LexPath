import pool from "../config/db.js";

export const getCareers = async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM careers ORDER BY created_at DESC");
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const getCareerById = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await pool.query("SELECT * FROM careers WHERE id = $1", [id]);
    if (result.rows.length === 0) return res.status(404).json({ message: "Career not found" });
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const createCareer = async (req, res) => {
  try {
    const {
      title, field, specialization, summary, description,
      skills_required, education_path, job_roles, avg_salary_range,
      top_companies, growth_prospects, challenges, work_environment,
      related_careers, image_url
    } = req.body;

    const result = await pool.query(
      `INSERT INTO careers
      (title, field, specialization, summary, description,
       skills_required, education_path, job_roles, avg_salary_range,
       top_companies, growth_prospects, challenges, work_environment,
       related_careers, image_url)
      VALUES
      ($1,$2,$3,$4,$5,$6::jsonb,$7::jsonb,$8::jsonb,$9,$10::jsonb,$11,$12,$13,$14::jsonb,$15)
      RETURNING *`,
      [
        title, field, specialization, summary, description,
        JSON.stringify(skills_required || []), JSON.stringify(education_path || []),
        JSON.stringify(job_roles || []), avg_salary_range,
        JSON.stringify(top_companies || []), growth_prospects, challenges,
        work_environment, JSON.stringify(related_careers || []), image_url
      ]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const updateCareer = async (req, res) => {
  try {
    const { id } = req.params;
    const fields = Object.keys(req.body);
    const values = Object.values(req.body);

    const setClause = fields.map((f, i) =>
      `${f} = $${i + 1}${["skills_required", "education_path", "job_roles", "top_companies", "related_careers"].includes(f) ? "::jsonb" : ""}`
    ).join(", ");

    const query = `UPDATE careers SET ${setClause} WHERE id = $${fields.length + 1} RETURNING *`;
    const result = await pool.query(query, [...values, id]);

    if (result.rows.length === 0) return res.status(404).json({ message: "Career not found" });
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const deleteCareer = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await pool.query("DELETE FROM careers WHERE id = $1 RETURNING *", [id]);
    if (result.rows.length === 0) return res.status(404).json({ message: "Career not found" });
    res.json({ message: "Career deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};