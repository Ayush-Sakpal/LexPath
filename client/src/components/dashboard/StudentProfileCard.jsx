function StudentProfileCard({ user }) {
  return (
    <div className="bg-white p-6 rounded-2xl shadow-md flex items-center gap-6 hover:shadow-lg transition duration-300">
      {/* Profile Picture */}
      <div className="relative">
        <img
          src={user.avatar || "/default-avatar.png"}
          alt="Profile"
          className="w-20 h-20 rounded-full border-2 border-blue-500 object-cover"
        />
        {/* Optional online indicator */}
        <span className="absolute bottom-0 right-0 w-4 h-4 bg-green-500 border-2 border-white rounded-full" />
      </div>

      {/* User Info */}
      <div className="flex-1">
        <h2 className="text-2xl font-bold text-gray-800">{user.name}</h2>
        <p className="text-gray-500 mt-1">{user.email}</p>
        {/* Optional additional info */}
        {user.course && <p className="text-gray-500 mt-1">Course: {user.course}</p>}
        {user.city && <p className="text-gray-500 mt-1">Location: {user.city}</p>}
      </div>

      {/* Action Button (optional) */}
      {user.profileComplete !== false && (
        <button className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition">
          Edit Profile
        </button>
      )}
    </div>
  );
}

export default StudentProfileCard;
