function StudentProfileCard({ user }) {
  return (
    <div className="bg-white p-4 rounded shadow flex items-center gap-4">
      <img
        src={user.avatar}
        alt="Profile"
        className="w-16 h-16 rounded-full border"
      />
      <div>
        <h2 className="text-xl font-bold">{user.name}</h2>
        <p className="text-gray-600">{user.email}</p>
      </div>
    </div>
  );
}

export default StudentProfileCard;