import { Navigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios"

function ProtectedRoute ({children, allowedRoles}) {

  const [isValid, setIsValid] = useState(null);
  const token = localStorage.getItem("token");
  const user = JSON.parse(localStorage.getItem("user") || "{}");

  useEffect(() => {
    if (token) {
      axios
        .get("http://localhost:5000/api/auth/verify", {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then(() => {
          if (!allowedRoles || allowedRoles.includes(user.role)) {
            setIsValid(true);
          } else {
            setIsValid(false);
          }
        })
        .catch(() => setIsValid(false));
    } else {
      setIsValid(false);
    }
  }, [token, user.role, allowedRoles]);

  if(isValid === null) {
    return <p className="text-center mt-10">
      Checking...
    </p>
  }

  if(!isValid) {
    return <Navigate to="/login" replace/>
  }

  return children;
}

export default ProtectedRoute;