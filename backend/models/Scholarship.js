import mongoose from 'mongoose';

const scholarshipSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    country: { type: String, required: true, index: true },
    degreeLevel: { type: String, default: "Bachelor's" },
    fields: [{ type: String, required: true }],
    fundingCoverage: { type: String, required: true },
    fullyFunded: { type: Boolean, default: true, index: true },
    ieltsRequirement: {
      type: String,
      enum: ['Yes', 'No', 'Optional'],
      required: true,
      index: true
    },
    englishProofs: [{ type: String }],
    minGPA: { type: Number, default: 0 },
    deadline: { type: Date, required: true, index: true },
    officialLink: { type: String, required: true },
    description: { type: String }
  },
  { timestamps: true }
);

export default mongoose.model('Scholarship', scholarshipSchema);
