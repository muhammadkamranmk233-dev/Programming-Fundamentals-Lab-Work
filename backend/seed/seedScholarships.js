import 'dotenv/config';
import mongoose from 'mongoose';
import { connectDB } from '../config/db.js';
import Scholarship from '../models/Scholarship.js';
import { scholarships } from './scholarshipsData.js';

const run = async () => {
  await connectDB();
  await Scholarship.deleteMany({});
  await Scholarship.insertMany(scholarships);
  console.log('Scholarships seeded successfully');
  await mongoose.connection.close();
};

run();
