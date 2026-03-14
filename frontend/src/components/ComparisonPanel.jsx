const ComparisonPanel = ({ scholarships }) => {
  if (!scholarships.length) return null;

  return (
    <section className="rounded-xl bg-amber-50 p-4 dark:bg-amber-900/30">
      <h2 className="mb-2 text-lg font-bold">Scholarship Comparison</h2>
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr>
              <th className="text-left">Name</th>
              <th className="text-left">Country</th>
              <th className="text-left">IELTS</th>
              <th className="text-left">Funding</th>
            </tr>
          </thead>
          <tbody>
            {scholarships.map((s) => (
              <tr key={s._id}>
                <td>{s.name}</td>
                <td>{s.country}</td>
                <td>{s.ieltsRequirement}</td>
                <td>{s.fundingCoverage}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
};

export default ComparisonPanel;
