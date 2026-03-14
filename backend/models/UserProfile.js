import mongoose from 'mongoose';

const userProfileSchema = new mongoose.Schema(
  {
    fullName: { type: String, required: true },
    email: { type: String, required: true, lowercase: true },
    citizenshipCountry: { type: String, required: true },
    qualification: { type: String, required: true },
    fieldOfInterest: { type: String, required: true },
    preferredStudyCountry: { type: String, required: true },
    englishTestStatus: { type: String, enum: ['IELTS', 'No IELTS', 'MOI'], required: true },
    budget: { type: String, enum: ['Fully funded only'], default: 'Fully funded only' },
    gpaOrPercentage: { type: Number, required: true },
    favorites: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Scholarship' }],
    emailAlertsEnabled: { type: Boolean, default: false }
  },
  { timestamps: true }
);

userProfileSchema.index({ email: 1 }, { unique: true });

export default mongoose.model('UserProfile', userProfileSchema);
