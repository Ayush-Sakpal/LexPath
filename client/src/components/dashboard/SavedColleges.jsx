function SavedColleges({colleges}) {
  return (
    <div className="bg-white p-4 rounded shadow">

      <h3 className="text-xl font-bold font-heading mb-4">Saved Colleges</h3>

      <ul className="space-y-2">
         {
          colleges.map((college) => (
            <li key={college.id} className="border-b pb-2">
              <p className="font-semibold">{college.name}</p>

              <p className="text-sm text-neutralText">{college.rating}</p>
            </li>
          ))
         }
      </ul>

    </div>
  );
}

export default SavedColleges;