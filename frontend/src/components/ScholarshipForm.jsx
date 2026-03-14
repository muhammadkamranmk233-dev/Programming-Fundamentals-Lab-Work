import { useState } from 'react';

const initialForm = {
  fullName: '',
  email: '',
  citizenshipCountry: '',
  qualification: '',
  fieldOfInterest: 'Engineering',
  preferredStudyCountry: 'Turkey',
  englishTestStatus: 'No IELTS',
  budget: 'Fully funded only',
  gpaOrPercentage: 75
};

const ScholarshipForm = ({ onSubmit, loading }) => {
  const [formData, setFormData] = useState(initialForm);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <form
      className="grid gap-3 rounded-xl bg-white p-5 shadow dark:bg-slate-800 md:grid-cols-2"
      onSubmit={(e) => {
        e.preventDefault();
        onSubmit(formData);
      }}
    >
      {Object.entries(formData).map(([key, value]) => (
        <label key={key} className="text-sm font-medium text-slate-700 dark:text-slate-200">
          {key.replace(/([A-Z])/g, ' $1')}
          <input
            className="mt-1 w-full rounded-md border border-slate-300 p-2 dark:border-slate-600 dark:bg-slate-900"
            name={key}
            value={value}
            onChange={handleChange}
          />
        </label>
      ))}
      <button className="rounded-md bg-indigo-600 px-4 py-2 font-semibold text-white hover:bg-indigo-500" type="submit">
        {loading ? 'Matching...' : 'Find Scholarships'}
      </button>
    </form>
  );
};

export default ScholarshipForm;
