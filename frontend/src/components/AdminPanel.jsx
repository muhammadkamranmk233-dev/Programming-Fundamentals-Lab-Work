import { useState } from 'react';
import { api } from '../services/api';

const defaultScholarship = {
  name: '',
  country: '',
  degreeLevel: "Bachelor's",
  fields: 'Engineering',
  fundingCoverage: '',
  ieltsRequirement: 'Optional',
  deadline: '',
  officialLink: ''
};

const AdminPanel = () => {
  const [credentials, setCredentials] = useState({ email: '', password: '' });
  const [token, setToken] = useState('');
  const [scholarship, setScholarship] = useState(defaultScholarship);

  const login = async () => {
    const { data } = await api.post('/admin/login', credentials);
    setToken(data.token);
  };

  const addScholarship = async () => {
    await api.post(
      '/admin/scholarships',
      { ...scholarship, fields: scholarship.fields.split(',').map((x) => x.trim()), fullyFunded: true },
      { headers: { Authorization: `Bearer ${token}` } }
    );
    setScholarship(defaultScholarship);
  };

  return (
    <section className="rounded-xl bg-white p-5 shadow dark:bg-slate-800">
      <h2 className="text-xl font-semibold">Admin Dashboard</h2>
      <div className="mt-3 grid gap-2 md:grid-cols-3">
        <input className="rounded border p-2 dark:bg-slate-900" placeholder="Admin email" value={credentials.email} onChange={(e) => setCredentials((p) => ({ ...p, email: e.target.value }))} />
        <input className="rounded border p-2 dark:bg-slate-900" placeholder="Admin password" type="password" value={credentials.password} onChange={(e) => setCredentials((p) => ({ ...p, password: e.target.value }))} />
        <button className="rounded bg-slate-700 px-4 py-2 text-white" onClick={login}>Login</button>
      </div>
      <div className="mt-4 grid gap-2 md:grid-cols-4">
        {Object.entries(scholarship).map(([k, v]) => (
          <input key={k} className="rounded border p-2 dark:bg-slate-900" placeholder={k} value={v} onChange={(e) => setScholarship((p) => ({ ...p, [k]: e.target.value }))} />
        ))}
      </div>
      <button className="mt-3 rounded bg-indigo-600 px-4 py-2 text-white" onClick={addScholarship} disabled={!token}>Add Scholarship</button>
    </section>
  );
};

export default AdminPanel;
