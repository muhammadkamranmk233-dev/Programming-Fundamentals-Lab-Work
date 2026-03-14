import { getDaysLeft } from '../utils/deadline';
import { useAppContext } from '../context/AppContext';

const ScholarshipCard = ({ scholarship, onFavorite }) => {
  const { compareList, setCompareList } = useAppContext();

  const toggleCompare = () => {
    setCompareList((prev) => (prev.includes(scholarship._id) ? prev.filter((id) => id !== scholarship._id) : [...prev, scholarship._id].slice(-3)));
  };

  return (
    <article className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm dark:border-slate-700 dark:bg-slate-800">
      <h3 className="text-lg font-bold">{scholarship.name}</h3>
      <p className="text-sm text-slate-500 dark:text-slate-300">{scholarship.country} • {scholarship.degreeLevel}</p>
      <p className="mt-2 text-sm">Funding: {scholarship.fundingCoverage}</p>
      <p className="text-sm">IELTS: {scholarship.ieltsRequirement}</p>
      <p className="text-sm">Deadline: {new Date(scholarship.deadline).toLocaleDateString()} ({getDaysLeft(scholarship.deadline)} days left)</p>
      <a className="mt-2 inline-block text-sm font-semibold text-indigo-600" href={scholarship.officialLink} target="_blank" rel="noreferrer">Official Link</a>
      <div className="mt-3 flex gap-2">
        <button className="rounded bg-indigo-600 px-3 py-1 text-xs text-white" onClick={() => onFavorite(scholarship._id)}>Save</button>
        <button className="rounded bg-slate-600 px-3 py-1 text-xs text-white" onClick={toggleCompare}>{compareList.includes(scholarship._id) ? 'Remove Compare' : 'Compare'}</button>
      </div>
    </article>
  );
};

export default ScholarshipCard;
