const Filters = ({ filters, setFilters }) => {
  const updateFilter = (key, value) => setFilters((prev) => ({ ...prev, [key]: value }));

  return (
    <div className="grid gap-3 rounded-xl bg-white p-5 shadow dark:bg-slate-800 md:grid-cols-5">
      <input placeholder="Country" className="rounded border p-2 dark:bg-slate-900" value={filters.country} onChange={(e) => updateFilter('country', e.target.value)} />
      <input placeholder="Field" className="rounded border p-2 dark:bg-slate-900" value={filters.field} onChange={(e) => updateFilter('field', e.target.value)} />
      <select className="rounded border p-2 dark:bg-slate-900" value={filters.ieltsRequirement} onChange={(e) => updateFilter('ieltsRequirement', e.target.value)}>
        <option value="">IELTS Requirement</option>
        <option>Yes</option>
        <option>No</option>
        <option>Optional</option>
      </select>
      <input type="date" className="rounded border p-2 dark:bg-slate-900" value={filters.deadlineBefore} onChange={(e) => updateFilter('deadlineBefore', e.target.value)} />
      <label className="flex items-center gap-2 text-sm">
        <input type="checkbox" checked={filters.fullyFunded} onChange={(e) => updateFilter('fullyFunded', e.target.checked)} />
        Fully Funded
      </label>
    </div>
  );
};

export default Filters;
