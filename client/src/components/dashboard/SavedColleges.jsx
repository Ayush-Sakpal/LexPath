function SavedColleges({ colleges }) {
  return (
    <div>
      <h2>Saved Colleges</h2>
      {(!colleges || colleges.length === 0) ? (
        <p>No saved colleges.</p>
      ) : (
        <ul>
          {colleges.map((college) => (
            <li key={college.id}>{college.name}</li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default SavedColleges;