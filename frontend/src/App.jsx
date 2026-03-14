import { useEffect, useMemo, useState } from 'react';
import Hero from './components/Hero';
import ScholarshipForm from './components/ScholarshipForm';
import Filters from './components/Filters';
import ScholarshipCard from './components/ScholarshipCard';
import ComparisonPanel from './components/ComparisonPanel';
import AdminPanel from './components/AdminPanel';
import { api } from './services/api';
import { useAppContext } from './context/AppContext';

const defaultFilters = { country: '', field: '', ieltsRequirement: '', deadlineBefore: '', fullyFunded: true };

function App() {
  const [scholarships, setScholarships] = useState([]);
  const [filters, setFilters] = useState(defaultFilters);
  const [loading, setLoading] = useState(false);
  const [userEmail, setUserEmail] = useState('');
  const [comparisonRows, setComparisonRows] = useState([]);
  const { compareList, theme, setTheme } = useAppContext();

  const fetchScholarships = async (activeFilters = filters) => {
    const params = { ...activeFilters, fullyFunded: String(activeFilters.fullyFunded) };
    const { data } = await api.get('/scholarships', { params });
    setScholarships(data);
  };

  useEffect(() => {
    fetchScholarships(defaultFilters);
  }, []);

  useEffect(() => {
    document.documentElement.classList.toggle('dark', theme === 'dark');
  }, [theme]);

  useEffect(() => {
    if (!compareList.length) {
      setComparisonRows([]);
      return;
    }

    api.get(`/scholarships/compare?ids=${compareList.join(',')}`).then((res) => setComparisonRows(res.data));
  }, [compareList]);

  const onMatch = async (profile) => {
    setLoading(true);
    try {
      setUserEmail(profile.email);
      await api.post('/scholarships/profile', profile);
      const { data } = await api.post('/scholarships/match', profile);
      setScholarships(data);
    } finally {
      setLoading(false);
    }
  };

  const onFavorite = (scholarshipId) => {
    if (!userEmail) return;
    api.post('/scholarships/favorites', { email: userEmail, scholarshipId });
  };

  const toggleAlerts = () => {
    if (!userEmail) return;
    api.post('/scholarships/alerts', { email: userEmail, enabled: true });
  };

  const filteredCountLabel = useMemo(() => `${scholarships.length} scholarships found`, [scholarships.length]);

  return (
    <div className="min-h-screen bg-slate-50 p-4 text-slate-900 dark:bg-slate-900 dark:text-white md:p-8">
      <div className="mx-auto flex max-w-7xl flex-col gap-6">
        <div className="flex justify-end">
          <button className="rounded border px-3 py-1 text-sm" onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}>
            Switch to {theme === 'dark' ? 'Light' : 'Dark'} Mode
          </button>
        </div>
        <Hero />
        <ScholarshipForm onSubmit={onMatch} loading={loading} />
        <Filters filters={filters} setFilters={setFilters} />
        <div className="flex items-center justify-between">
          <p className="text-sm text-slate-500 dark:text-slate-300">{filteredCountLabel}</p>
          <div className="flex gap-2">
            <button className="rounded bg-indigo-600 px-3 py-2 text-sm text-white" onClick={() => fetchScholarships()}>Apply Filters</button>
            <button className="rounded bg-emerald-600 px-3 py-2 text-sm text-white" onClick={toggleAlerts}>Enable Email Alerts</button>
          </div>
        </div>
        <ComparisonPanel scholarships={comparisonRows} />
        <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {scholarships.map((scholarship) => (
            <ScholarshipCard key={scholarship._id} scholarship={scholarship} onFavorite={onFavorite} />
          ))}
        </section>
        <AdminPanel />
      </div>
    </div>
  );
}

export default App;
