import pool from "../config/db.js";

export const getExams = async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM exams ORDER BY created_at DESC");
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const getExamById = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await pool.query("SELECT * FROM exams WHERE id = $1", [id]);
    if (result.rows.length === 0) return res.status(404).json({ message: "Exam not found" });
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const createExam = async (req, res) => {
  try {
    const {
      name, level, mode, conducting_body, eligibility, exam_date,
      application_start, application_end, syllabus, exam_pattern,
      duration, marking_scheme, fees, official_website, contact_email,
      description, top_colleges_accepting, resources
    } = req.body;

    const result = await pool.query(
      `INSERT INTO exams
      (name, level, mode, conducting_body, eligibility, exam_date,
       application_start, application_end, syllabus, exam_pattern,
       duration, marking_scheme, fees, official_website, contact_email,
       description, top_colleges_accepting, resources)
      VALUES
      ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14,$15,$16,$17::jsonb,$18::jsonb)
      RETURNING *`,
      [
        name, level, mode, conducting_body, eligibility, exam_date,
        application_start, application_end, syllabus, exam_pattern,
        duration, marking_scheme, fees, official_website, contact_email,
        description, JSON.stringify(top_colleges_accepting || []), JSON.stringify(resources || [])
      ]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const updateExam = async (req, res) => {
  try {
    const { id } = req.params;
    const fields = Object.keys(req.body);
    const values = Object.values(req.body);

    const setClause = fields.map((f, i) =>
      `${f} = $${i + 1}${["top_colleges_accepting", "resources"].includes(f) ? "::jsonb" : ""}`
    ).join(", ");

    const query = `UPDATE exams SET ${setClause} WHERE id = $${fields.length + 1} RETURNING *`;
    const result = await pool.query(query, [...values, id]);

    if (result.rows.length === 0) return res.status(404).json({ message: "Exam not found" });
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const deleteExam = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await pool.query("DELETE FROM exams WHERE id = $1 RETURNING *", [id]);
    if (result.rows.length === 0) return res.status(404).json({ message: "Exam not found" });
    res.json({ message: "Exam deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};