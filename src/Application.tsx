import React, { useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";

const Application = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  useEffect(() => {
    const code = searchParams.get("code");
    console.log(searchParams.toString());
    if (!code) {
      navigate("/login");
    }
  }, [searchParams, navigate]);

  return (
    <div className="container">
      <h1>Welcome!</h1>
    </div>
  );
};

export default Application;
