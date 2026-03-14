import Scholarship from '../models/Scholarship.js';
import UserProfile from '../models/UserProfile.js';

export const getScholarships = async (req, res) => {
  const { country, field, ieltsRequirement, deadlineBefore, fullyFunded } = req.query;

  const filter = {};
  if (country) filter.country = country;
  if (field) filter.fields = { $in: [field] };
  if (ieltsRequirement) filter.ieltsRequirement = ieltsRequirement;
  if (deadlineBefore) filter.deadline = { $lte: new Date(deadlineBefore) };
  if (fullyFunded === 'true') filter.fullyFunded = true;

  const scholarships = await Scholarship.find(filter).sort({ deadline: 1 });
  return res.json(scholarships);
};

export const matchScholarships = async (req, res) => {
  const profile = req.body;

  const query = {
    fullyFunded: true,
    minGPA: { $lte: Number(profile.gpaOrPercentage) || 0 },
    fields: { $in: [profile.fieldOfInterest] }
  };

  if (profile.preferredStudyCountry) query.country = profile.preferredStudyCountry;

  if (profile.englishTestStatus === 'No IELTS') {
    query.ieltsRequirement = { $in: ['No', 'Optional'] };
  } else if (profile.englishTestStatus === 'MOI') {
    query.$or = [
      { ieltsRequirement: { $in: ['No', 'Optional'] } },
      { englishProofs: { $in: ['MOI'] } }
    ];
  }

  const matches = await Scholarship.find(query).sort({ deadline: 1 });
  return res.json(matches);
};

export const saveProfile = async (req, res) => {
  const payload = req.body;
  const profile = await UserProfile.findOneAndUpdate(
    { email: payload.email },
    payload,
    { upsert: true, new: true, setDefaultsOnInsert: true }
  );

  return res.status(201).json(profile);
};

export const toggleFavorite = async (req, res) => {
  const { email, scholarshipId } = req.body;
  const profile = await UserProfile.findOne({ email });

  if (!profile) {
    return res.status(404).json({ message: 'Profile not found' });
  }

  const index = profile.favorites.findIndex((id) => id.toString() === scholarshipId);
  if (index >= 0) {
    profile.favorites.splice(index, 1);
  } else {
    profile.favorites.push(scholarshipId);
  }

  await profile.save();
  return res.json(profile);
};

export const getComparison = async (req, res) => {
  const ids = (req.query.ids || '').split(',').filter(Boolean);
  const scholarships = await Scholarship.find({ _id: { $in: ids } });
  return res.json(scholarships);
};

export const subscribeAlerts = async (req, res) => {
  const { email, enabled } = req.body;
  const profile = await UserProfile.findOneAndUpdate(
    { email },
    { emailAlertsEnabled: enabled },
    { new: true }
  );

  if (!profile) {
    return res.status(404).json({ message: 'Profile not found' });
  }

  return res.json({ message: `Email alerts ${enabled ? 'enabled' : 'disabled'}`, profile });
};
