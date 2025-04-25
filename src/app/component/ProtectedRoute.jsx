// component/ProtectedRoute.jsx
"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

const ProtectedRoute = ({ children }) => {
  const router = useRouter();
  const [isClient, setIsClient] = useState(false);
  const [isAuthorized, setIsAuthorized] = useState(false);

  useEffect(() => {
    setIsClient(true); // So we know it's running on client now

    const token = localStorage.getItem("authToken");
    if (!token) {
      router.replace("/login"); // Redirect to login
    } else {
      setIsAuthorized(true); // Let the page render
    }
  }, []);

  // Don’t render anything on the server
  if (!isClient || !isAuthorized) return null;

  return <>{children}</>;
};

export default ProtectedRoute;
