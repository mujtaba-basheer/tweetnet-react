import React, { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";

const Callback = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [token, setToken] = useState("");

  useEffect(() => {
    const code = searchParams.get("code");
    if (!code) {
      navigate("/login");
    } else {
      fetch(`${process.env.REACT_APP_BASE_URL}/auth/token`, {
        method: "POST",
        body: JSON.stringify({ code, mid: "62bda0b3945ec700049f88b0" }),
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((res) => res.json())
        .then(({ data }) => {
          sessionStorage.setItem("token", JSON.stringify(data));
          setToken(data.access_token);
          setTimeout(() => navigate("/follows"), 10000);
        })
        .catch((err) => console.error(err));
    }
  }, [searchParams, navigate]);

  return (
    <div className="container">
      <h1>Redirecting to Follows...</h1>
      {token && <p>{token}</p>}
    </div>
  );
};

export default Callback;
