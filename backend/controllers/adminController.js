import jwt from 'jsonwebtoken';
import Scholarship from '../models/Scholarship.js';

export const loginAdmin = (req, res) => {
  const { email, password } = req.body;

  if (email !== process.env.ADMIN_EMAIL || password !== process.env.ADMIN_PASSWORD) {
    return res.status(401).json({ message: 'Invalid admin credentials' });
  }

  const token = jwt.sign({ role: 'admin', email }, process.env.JWT_SECRET, { expiresIn: '8h' });
  return res.json({ token });
};

export const addScholarship = async (req, res) => {
  const scholarship = await Scholarship.create(req.body);
  return res.status(201).json(scholarship);
};

export const updateScholarship = async (req, res) => {
  const updated = await Scholarship.findByIdAndUpdate(req.params.id, req.body, { new: true });

  if (!updated) {
    return res.status(404).json({ message: 'Scholarship not found' });
  }

  return res.json(updated);
};

export const updateDeadline = async (req, res) => {
  const { deadline } = req.body;
  const updated = await Scholarship.findByIdAndUpdate(req.params.id, { deadline }, { new: true });

  if (!updated) {
    return res.status(404).json({ message: 'Scholarship not found' });
  }

  return res.json(updated);
};
