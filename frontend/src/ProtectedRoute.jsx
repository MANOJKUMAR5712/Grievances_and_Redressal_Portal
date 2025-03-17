import { Navigate, Outlet } from "react-router";
import { ensureAuthenticated } from "./store/auth.store";
import { useEffect, useState } from "react";

const ProtectedRoute = () => {
  const {isAuthenticated,getAuthStatus} = ensureAuthenticated();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
      async function checkAuth() {
        try {
          await getAuthStatus();
        } catch (error) {
          console.log(`Auth check failed : ${error}`);
        } finally {
          setLoading(false);
        }
      }
      checkAuth();
  }, [isAuthenticated]);

  if (loading) return <div>Loading...</div>;

  return isAuthenticated ? <Outlet replace/> : <Navigate to="/login" replace />;
};

export default ProtectedRoute;
